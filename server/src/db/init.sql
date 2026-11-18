-- ============================================================
-- HUGO HEMATOBIO — Initialisation PostgreSQL
-- ============================================================

-- ============================================================
-- TABLE : admins
-- ============================================================

CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE : actualites
-- ============================================================

CREATE TABLE IF NOT EXISTS actualites (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    info VARCHAR(255),
    accent VARCHAR(100),
    icon VARCHAR(20),
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE : projets
-- ============================================================

CREATE TABLE IF NOT EXISTS projets (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(20) NOT NULL,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE : formations
-- ============================================================

CREATE TABLE IF NOT EXISTS formations (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    link TEXT,
    icon VARCHAR(20) NOT NULL,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE : contenus
-- ============================================================

CREATE TABLE IF NOT EXISTS contenus (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    authors TEXT,
    year INTEGER,
    link TEXT,
    icon VARCHAR(20) NOT NULL,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE : centres
-- ============================================================

CREATE TABLE IF NOT EXISTS centres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    structure VARCHAR(150),
    longitude DECIMAL(9,6),
    latitude DECIMAL(9,6),
    description TEXT,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO centres (
    name,
    city,
    structure,
    longitude,
    latitude,
    description
)
SELECT *
FROM (VALUES
    ('CHU de Brest', 'Brest', NULL, -4.486100, 48.390400, NULL),
    ('CHU de Rennes', 'Rennes', NULL, -1.677800, 48.117300, NULL),
    ('CHU de Nantes', 'Nantes', NULL, -1.553600, 47.218400, NULL),
    ('CHU d''Angers', 'Angers', NULL, -0.563200, 47.478400, NULL),
    ('CHU du Mans', 'Le Mans', NULL, 0.199600, 48.006100, NULL),
    ('CHU de Tours', 'Tours', NULL, 0.689000, 47.394100, NULL),
    ('CHU de Poitiers', 'Poitiers', NULL, 0.346700, 46.580200, NULL),
    ('CHU d''Orléans', 'Orléans', NULL, 1.909300, 47.903000, NULL)
) AS initial_data(name, city, structure, longitude, latitude, description)
WHERE NOT EXISTS (
    SELECT 1 FROM centres c
    WHERE c.name = initial_data.name
      AND c.city = initial_data.city
);