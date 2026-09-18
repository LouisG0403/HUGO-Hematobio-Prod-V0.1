CREATE TABLE IF NOT EXISTS centres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    structure VARCHAR(150),
    position_x DECIMAL(5,2) NOT NULL,
    position_y DECIMAL(5,2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO centres (
    name,
    city,
    structure,
    position_x,
    position_y,
    description
)
VALUES
    ('CHU de Brest', 'Brest', NULL, 15.00, 16.00, NULL),
    ('CHU de Rennes', 'Rennes', NULL, 40.00, 38.00, NULL),
    ('CHU de Nantes', 'Nantes', NULL, 15.00, 63.00, NULL),
    ('CHU d''Angers', 'Angers', NULL, 65.00, 45.00, NULL),
    ('CHU du Mans', 'Le Mans', NULL, 75.00, 18.00, NULL),
    ('CHU de Tours', 'Tours', NULL, 70.00, 72.00, NULL),
    ('CHU de Poitiers', 'Poitiers', NULL, 35.00, 80.00, NULL),
    ('CHU d''Orléans', 'Orléans', NULL, 48.00, 8.00, NULL);