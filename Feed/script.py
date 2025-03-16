import xml.etree.ElementTree as ET
import mysql.connector


# Az XML fájl elérési útja (javított változat)
xml_file_path = "Feed\\Notino_hu-NotinoHU_google_all-shopping.xml"

db_config = {
    "host": "127.0.0.1",
    "port": 3307,
    "user": "root",  # Cseréld le a saját felhasználónevedre
    "password": "",  # Cseréld le a saját jelszavadra
    "database": "parfumvilag"
}

# Adatbázishoz csatlakozás
connection = mysql.connector.connect(**db_config)
cursor = connection.cursor()

# Márkanév és parfüm név tisztítása
def clean_name(name):
    if name is None:
        return "Unknown Name"
    # Backslash (\) karakterek eltávolítása
    cleaned_name = name.replace("\\", "")
    # '/' karakterek cseréje '-' karakterre
    cleaned_name = cleaned_name.replace("/", "-")
    # Escape-eljük az aposztrófokat dupla aposztróffal az SQL kompatibilitás érdekében
    cleaned_name = cleaned_name.replace("'", "''")
    return cleaned_name

# XML fájl beolvasása
tree = ET.parse(xml_file_path)
root = tree.getroot()

# Feldolgozás és adatbázisba írás
for entry in root.findall("entry"):
    # Ellenőrizzük, hogy a termék "Perfume & Cologne" kategóriájú-e
    google_product_category_name = entry.find("google_product_category_name").text
    if google_product_category_name is None or "Perfume & Cologne" not in google_product_category_name:
        continue

    # Ellenőrizzük, hogy a product_type mező nem utal-e szappanra
    product_type = entry.find("product_type")
    if product_type is not None and "Mýdla" in product_type.text:
        continue

    # Adatok kinyerése az XML-ből, alapértelmezett értékekkel, ha valami hiányzik
    title = entry.find("title").text if entry.find("title") is not None else "Unknown Title"
    brand_name = entry.find("brand").text if entry.find("brand") is not None else "Unknown Brand"
    description = entry.find("description").text if entry.find("description") is not None else "No description available"
    image_url = entry.find("image_link").text if entry.find("image_link") is not None else "No image URL"
    price = float(entry.find("price").text.split()[0]) if entry.find("price") is not None else 0.0
    gender = entry.find("gender").text if entry.find("gender") is not None else "unisex"
    size = entry.find("size").text if entry.find("size") is not None else "Unknown Size"
    link = entry.find("link").text if entry.find("link") is not None else "No link available"

    # Tisztított márkanév, parfüm név és leírás
    cleaned_brand_name = clean_name(brand_name)
    cleaned_title = clean_name(title)
    cleaned_description = clean_name(description)

    # Ellenőrizzük, hogy a product_type elem létezik-e, és értelmezzük a tartalmát
    if product_type is not None:
        if "Toaletní vody" in product_type.text:
            perfume_type = "Eau de Toilette"
        elif "Parfémované vody" in product_type.text:
            perfume_type = "Eau de Parfum"
        else:
            perfume_type = "Unknown Type"
    else:
        perfume_type = "Unknown Type"

    # Márka ID-je lekérése vagy létrehozása
    cursor.execute("SELECT id FROM brands WHERE name = %s", (cleaned_brand_name,))
    brand_result = cursor.fetchone()
    if brand_result:
        brand_id = brand_result[0]
    else:
        cursor.execute("INSERT INTO brands (name) VALUES (%s)", (cleaned_brand_name,))
        brand_id = cursor.lastrowid

    # Parfüm hozzáadása a perfumes táblához
    cursor.execute("""
        INSERT INTO perfumes (name, brand_id, gender, type, description, image_url)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        cleaned_title,
        brand_id,
        gender.lower() if gender else None,
        perfume_type,
        cleaned_description,
        image_url
    ))

    # Bolti ár hozzáadása a stores táblához
    perfume_id = cursor.lastrowid
    cursor.execute("""
        INSERT INTO stores (perfume_id, store_name, price, currency, url)
        VALUES (%s, %s, %s, %s, %s)
    """, (
        perfume_id,
        "Notino",
        price,
        "HUF",
        link
    ))

# Adatbázis módosítások mentése és kapcsolat bezárása
connection.commit()
cursor.close()
connection.close()

print("Adatok sikeresen felvéve az adatbázisba!")