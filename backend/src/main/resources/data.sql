-- Admin user (password: admin123)
INSERT INTO admins (username, password) VALUES ('admin', 'admin123');

-- Products: Chaussures Femmes (some on sale)
INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Escarpins Noirs Classiques', 'Escarpins elegants en cuir veritable avec talon de 8cm. Semelle interieure coussinee pour un confort optimal.', 'Escarpins cuir talon 8cm', 899.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', 40, true, 629.00, 30);

INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Sneakers Blanches Femme', 'Baskets blanches minimalistes en cuir souple. Semelle plate confortable pour un usage quotidien.', 'Baskets blanches cuir souple', 699.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400', 80, false, NULL, NULL);

INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Bottines Chelsea Camel', 'Bottines Chelsea en daim avec elastique lateral. Talon bloc de 4cm. Look tendance pour automne et hiver.', 'Bottines daim talon bloc 4cm', 1199.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', 35, true, 839.00, 30);

INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Sandales a Talons Dorees', 'Sandales a talons fins de 10cm avec brides dorees. Elegantes pour les soirees.', 'Sandales talons fins brides dorees', 799.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400', 50, true, 559.00, 30);

INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Mocassins Beiges Confort', 'Mocassins souples en cuir beige avec semelle flexible. Look chic et decontracte.', 'Mocassins cuir beige semelle flexible', 599.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', 60, false, NULL, NULL);

INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Bottes Hautes Noires', 'Bottes hautes en cuir noir avec fermeture eclair laterale. Talon de 5cm. Doublure chaude.', 'Bottes cuir noir montantes talon 5cm', 1499.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=400', 25, false, NULL, NULL);

-- Products: Sacs Femmes (some on sale)
INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Sac a Main Cuir Noir', 'Sac a main elegant en cuir veritable noir. Compartiment spacieux avec poche interieure zippee.', 'Sac cuir noir bandouliere amovible', 1299.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', 45, true, 909.00, 30);

INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Sac Bandouliere Camel', 'Petit sac bandouliere en cuir camel avec fermoir metal. Format compact pour les sorties.', 'Sac bandouliere cuir camel chaine doree', 899.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', 55, false, NULL, NULL);

INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Cabas Tote Beige', 'Grand sac cabas en toile et cuir beige. Tres spacieux pour le travail ou les courses.', 'Cabas toile et cuir grande capacite', 799.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', 70, false, NULL, NULL);

INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Pochette de Soiree Rose', 'Pochette elegante en satin rose avec fermoir strass. Parfaite pour les soirees.', 'Pochette satin rose fermoir strass', 499.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400', 90, true, 349.00, 30);

INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Sac a Dos Femme Cuir', 'Sac a dos feminin en cuir synthetique. Design elegant avec multiples compartiments.', 'Sac a dos cuir elegant multi-compartiments', 999.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 40, false, NULL, NULL);

INSERT INTO products (name, description, short_description, price, category, image_url, stock, on_sale, sale_price, discount_percent) VALUES
('Sac Seau Franges Marron', 'Sac seau boheme en cuir marron avec franges decoratives. Bandouliere ajustable.', 'Sac seau boheme cuir franges', 1099.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400', 30, true, 769.00, 30);

-- Sizes for Chaussures (product_id 1-6)
INSERT INTO product_sizes (product_id, size, stock) VALUES (1, '36', 5), (1, '37', 8), (1, '38', 10), (1, '39', 9), (1, '40', 5), (1, '41', 3);
INSERT INTO product_sizes (product_id, size, stock) VALUES (2, '36', 10), (2, '37', 15), (2, '38', 20), (2, '39', 18), (2, '40', 12), (2, '41', 5);
INSERT INTO product_sizes (product_id, size, stock) VALUES (3, '36', 4), (3, '37', 6), (3, '38', 8), (3, '39', 9), (3, '40', 5), (3, '41', 3);
INSERT INTO product_sizes (product_id, size, stock) VALUES (4, '36', 8), (4, '37', 10), (4, '38', 12), (4, '39', 10), (4, '40', 7), (4, '41', 3);
INSERT INTO product_sizes (product_id, size, stock) VALUES (5, '36', 8), (5, '37', 12), (5, '38', 15), (5, '39', 12), (5, '40', 8), (5, '41', 5);
INSERT INTO product_sizes (product_id, size, stock) VALUES (6, '36', 3), (6, '37', 5), (6, '38', 6), (6, '39', 5), (6, '40', 4), (6, '41', 2);

-- Sizes for Sacs (Unique)
INSERT INTO product_sizes (product_id, size, stock) VALUES (7, 'Unique', 45), (8, 'Unique', 55), (9, 'Unique', 70), (10, 'Unique', 90), (11, 'Unique', 40), (12, 'Unique', 30);

-- Colors (with stock)
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (1, 'Noir', '#000000', NULL, 20), (1, 'Rouge', '#8B0000', NULL, 12), (1, 'Nude', '#E8C4A2', NULL, 8);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (2, 'Blanc', '#FFFFFF', NULL, 40), (2, 'Rose', '#FFB6C1', NULL, 25), (2, 'Gris', '#808080', NULL, 15);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (3, 'Camel', '#C19A6B', NULL, 15), (3, 'Noir', '#000000', NULL, 12), (3, 'Marron', '#5C3317', NULL, 8);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (4, 'Dore', '#FFD700', NULL, 25), (4, 'Argent', '#C0C0C0', NULL, 15), (4, 'Noir', '#000000', NULL, 10);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (5, 'Beige', '#F5F5DC', NULL, 30), (5, 'Blanc', '#FFFFFF', NULL, 20), (5, 'Noir', '#000000', NULL, 10);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (6, 'Noir', '#000000', NULL, 15), (6, 'Marron', '#5C3317', NULL, 10);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (7, 'Noir', '#000000', NULL, 20), (7, 'Camel', '#C19A6B', NULL, 15), (7, 'Bordeaux', '#800020', NULL, 10);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (8, 'Camel', '#C19A6B', NULL, 25), (8, 'Noir', '#000000', NULL, 20), (8, 'Beige', '#F5F5DC', NULL, 10);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (9, 'Beige', '#F5F5DC', NULL, 30), (9, 'Noir', '#000000', NULL, 25), (9, 'Marine', '#000080', NULL, 15);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (10, 'Rose', '#FFB6C1', NULL, 40), (10, 'Noir', '#000000', NULL, 30), (10, 'Dore', '#FFD700', NULL, 20);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (11, 'Noir', '#000000', NULL, 20), (11, 'Camel', '#C19A6B', NULL, 12), (11, 'Gris', '#808080', NULL, 8);
INSERT INTO product_colors (product_id, name, hex_code, image_url, stock) VALUES (12, 'Marron', '#5C3317', NULL, 15), (12, 'Noir', '#000000', NULL, 10), (12, 'Camel', '#C19A6B', NULL, 5);
