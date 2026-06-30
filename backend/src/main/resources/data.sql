-- Admin user (password: admin123)
INSERT INTO admins (username, password) VALUES ('admin', 'admin123');

-- Products: Chaussures Femmes
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Escarpins Noirs Classiques', 'Escarpins elegants en cuir veritable avec talon de 8cm. Semelle interieure coussinee pour un confort optimal. Parfaits pour le bureau ou les soirees.', 'Escarpins cuir talon 8cm', 899.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', 40);
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Sneakers Blanches Femme', 'Baskets blanches minimalistes en cuir souple. Semelle plate confortable pour un usage quotidien. Design epure et moderne.', 'Baskets blanches cuir souple', 699.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400', 80);
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Bottines Chelsea Camel', 'Bottines Chelsea en daim avec elastique lateral. Talon bloc de 4cm. Look tendance et versatile pour automne et hiver.', 'Bottines daim talon bloc 4cm', 1199.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', 35);
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Sandales a Talons Dorees', 'Sandales a talons fins de 10cm avec brides dorees. Fermeture par boucle a la cheville. Elegantes pour les soirees.', 'Sandales talons fins brides dorees', 799.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400', 50);
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Mocassins Beiges Confort', 'Mocassins souples en cuir beige avec semelle flexible. Ideal pour un look chic et decontracte au quotidien.', 'Mocassins cuir beige semelle flexible', 599.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', 60);
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Bottes Hautes Noires', 'Bottes hautes en cuir noir avec fermeture eclair laterale. Talon de 5cm. Tige montante genou. Doublure chaude.', 'Bottes cuir noir montantes talon 5cm', 1499.00, 'Chaussures Femmes', 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=400', 25);

-- Products: Sacs Femmes
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Sac a Main Cuir Noir', 'Sac a main elegant en cuir veritable noir. Compartiment spacieux avec poche interieure zippee. Bandouliere ajustable.', 'Sac cuir noir bandouliere amovible', 1299.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', 45);
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Sac Bandouliere Camel', 'Petit sac bandouliere en cuir camel avec fermoir metal. Format compact ideal pour les sorties. Chaine doree.', 'Sac bandouliere cuir camel chaine doree', 899.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', 55);
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Cabas Tote Beige', 'Grand sac cabas en toile et cuir beige. Tres spacieux pour le travail ou les courses. Poches multiples.', 'Cabas toile et cuir grande capacite', 799.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', 70);
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Pochette de Soiree Rose', 'Pochette elegante en satin rose avec fermoir strass. Format parfait pour les soirees. Chaine amovible.', 'Pochette satin rose fermoir strass', 499.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400', 90);
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Sac a Dos Femme Cuir', 'Sac a dos feminin en cuir synthetique de qualite. Design elegant avec multiples compartiments. Fermeture securisee.', 'Sac a dos cuir elegant multi-compartiments', 999.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 40);
INSERT INTO products (name, description, short_description, price, category, image_url, stock) VALUES
('Sac Seau Franges Marron', 'Sac seau boheme en cuir marron avec franges decoratives. Look tendance et decontracte. Bandouliere ajustable.', 'Sac seau boheme cuir franges', 1099.00, 'Sacs Femmes', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400', 30);

-- Sizes for Chaussures (product_id 1-6)
INSERT INTO product_sizes (product_id, size, stock) VALUES (1, '36', 5);
INSERT INTO product_sizes (product_id, size, stock) VALUES (1, '37', 8);
INSERT INTO product_sizes (product_id, size, stock) VALUES (1, '38', 10);
INSERT INTO product_sizes (product_id, size, stock) VALUES (1, '39', 9);
INSERT INTO product_sizes (product_id, size, stock) VALUES (1, '40', 5);
INSERT INTO product_sizes (product_id, size, stock) VALUES (1, '41', 3);

INSERT INTO product_sizes (product_id, size, stock) VALUES (2, '36', 10);
INSERT INTO product_sizes (product_id, size, stock) VALUES (2, '37', 15);
INSERT INTO product_sizes (product_id, size, stock) VALUES (2, '38', 20);
INSERT INTO product_sizes (product_id, size, stock) VALUES (2, '39', 18);
INSERT INTO product_sizes (product_id, size, stock) VALUES (2, '40', 12);
INSERT INTO product_sizes (product_id, size, stock) VALUES (2, '41', 5);

INSERT INTO product_sizes (product_id, size, stock) VALUES (3, '36', 4);
INSERT INTO product_sizes (product_id, size, stock) VALUES (3, '37', 6);
INSERT INTO product_sizes (product_id, size, stock) VALUES (3, '38', 8);
INSERT INTO product_sizes (product_id, size, stock) VALUES (3, '39', 9);
INSERT INTO product_sizes (product_id, size, stock) VALUES (3, '40', 5);
INSERT INTO product_sizes (product_id, size, stock) VALUES (3, '41', 3);

INSERT INTO product_sizes (product_id, size, stock) VALUES (4, '36', 8);
INSERT INTO product_sizes (product_id, size, stock) VALUES (4, '37', 10);
INSERT INTO product_sizes (product_id, size, stock) VALUES (4, '38', 12);
INSERT INTO product_sizes (product_id, size, stock) VALUES (4, '39', 10);
INSERT INTO product_sizes (product_id, size, stock) VALUES (4, '40', 7);
INSERT INTO product_sizes (product_id, size, stock) VALUES (4, '41', 3);

INSERT INTO product_sizes (product_id, size, stock) VALUES (5, '36', 8);
INSERT INTO product_sizes (product_id, size, stock) VALUES (5, '37', 12);
INSERT INTO product_sizes (product_id, size, stock) VALUES (5, '38', 15);
INSERT INTO product_sizes (product_id, size, stock) VALUES (5, '39', 12);
INSERT INTO product_sizes (product_id, size, stock) VALUES (5, '40', 8);
INSERT INTO product_sizes (product_id, size, stock) VALUES (5, '41', 5);

INSERT INTO product_sizes (product_id, size, stock) VALUES (6, '36', 3);
INSERT INTO product_sizes (product_id, size, stock) VALUES (6, '37', 5);
INSERT INTO product_sizes (product_id, size, stock) VALUES (6, '38', 6);
INSERT INTO product_sizes (product_id, size, stock) VALUES (6, '39', 5);
INSERT INTO product_sizes (product_id, size, stock) VALUES (6, '40', 4);
INSERT INTO product_sizes (product_id, size, stock) VALUES (6, '41', 2);

-- Sizes for Sacs (Unique size)
INSERT INTO product_sizes (product_id, size, stock) VALUES (7, 'Unique', 45);
INSERT INTO product_sizes (product_id, size, stock) VALUES (8, 'Unique', 55);
INSERT INTO product_sizes (product_id, size, stock) VALUES (9, 'Unique', 70);
INSERT INTO product_sizes (product_id, size, stock) VALUES (10, 'Unique', 90);
INSERT INTO product_sizes (product_id, size, stock) VALUES (11, 'Unique', 40);
INSERT INTO product_sizes (product_id, size, stock) VALUES (12, 'Unique', 30);

-- Colors for products
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (1, 'Noir', '#000000', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (1, 'Rouge', '#8B0000', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (1, 'Nude', '#E8C4A2', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (2, 'Blanc', '#FFFFFF', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (2, 'Rose', '#FFB6C1', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (2, 'Gris', '#808080', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (3, 'Camel', '#C19A6B', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (3, 'Noir', '#000000', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (3, 'Marron', '#5C3317', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (4, 'Dore', '#FFD700', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (4, 'Argent', '#C0C0C0', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (4, 'Noir', '#000000', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (5, 'Beige', '#F5F5DC', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (5, 'Blanc', '#FFFFFF', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (5, 'Noir', '#000000', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (6, 'Noir', '#000000', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (6, 'Marron', '#5C3317', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (7, 'Noir', '#000000', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (7, 'Camel', '#C19A6B', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (7, 'Bordeaux', '#800020', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (8, 'Camel', '#C19A6B', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (8, 'Noir', '#000000', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (8, 'Beige', '#F5F5DC', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (9, 'Beige', '#F5F5DC', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (9, 'Noir', '#000000', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (9, 'Marine', '#000080', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (10, 'Rose', '#FFB6C1', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (10, 'Noir', '#000000', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (10, 'Dore', '#FFD700', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (11, 'Noir', '#000000', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (11, 'Camel', '#C19A6B', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (11, 'Gris', '#808080', NULL);

INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (12, 'Marron', '#5C3317', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (12, 'Noir', '#000000', NULL);
INSERT INTO product_colors (product_id, name, hex_code, image_url) VALUES (12, 'Camel', '#C19A6B', NULL);
