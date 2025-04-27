-- Popularne składniki drinków
INSERT INTO ingredients (name, available)
VALUES ('Wódka', true),
       ('Gin', true),
       ('Rum', true),
       ('Tequila', true),
       ('Whiskey', true),
       ('Triple Sec', true),
       ('Sok z limonki', true),
       ('Sok z cytryny', true),
       ('Syrop cukrowy', true),
       ('Tonic', true),
       ('Woda gazowana', true),
       ('Cola', true),
       ('Sok pomarańczowy', true),
       ('Sok żurawinowy', true),
       ('Sok ananasowy', true),
       ('Liście mięty', true),
       ('Lód', true),
       ('Cukier', true),
       ('Sól', true),
       ('Angostura', true),
       ('Wermut', true),
       ('Redbull', true),
       ('Jagermaister', true),
       ('Likier kawowy', true),
       ('Irish Cream', true),
       ('Mleczko kokosowe', true),
       ('Grenadyna', true);

-- Przykładowe drinki z ich składnikami
INSERT INTO drinks (name, recipe)
VALUES ('Mojito',
        'Rozgnieć liście mięty z cukrem i sokiem z limonki. Dodaj rum, wypełnij lodem, uzupełnij wodą gazowaną i zamieszaj.'),
       ('Margarita',
        'Połącz tequilę, triple sec i sok z limonki w shakerze z lodem. Dobrze wstrząśnij i przecedź do szklanki z obrębieniem z soli.'),
       ('Jagerbomb',
        'Wlej Redbulla do wysokiej szklanki. W osobnym kieliszku przygotuj Jagermeister. Upuść kieliszek z Jagermeisterem do szklanki z Redbullem i wypij od razu.');

-- Powiąż drinki z ich składnikami
INSERT INTO drink_ingredients (drink_id, ingredient_id, quantity, unit)
SELECT d.id, i.id, 60, 'ml'
FROM drinks d,
     ingredients i
WHERE d.name = 'Mojito'
  AND i.name = 'Rum'
UNION ALL
SELECT d.id, i.id, 20, 'ml'
FROM drinks d,
     ingredients i
WHERE d.name = 'Mojito'
  AND i.name = 'Sok z limonki'
UNION ALL
SELECT d.id, i.id, 2, 'szt'
FROM drinks d,
     ingredients i
WHERE d.name = 'Mojito'
  AND i.name = 'Liście mięty'
UNION ALL
SELECT d.id, i.id, 1, 'łyżka'
FROM drinks d,
     ingredients i
WHERE d.name = 'Mojito'
  AND i.name = 'Cukier'
UNION ALL
SELECT d.id, i.id, 60, 'ml'
FROM drinks d,
     ingredients i
WHERE d.name = 'Mojito'
  AND i.name = 'Woda gazowana'
UNION ALL
SELECT d.id, i.id, 60, 'ml'
FROM drinks d,
     ingredients i
WHERE d.name = 'Margarita'
  AND i.name = 'Tequila'
UNION ALL
SELECT d.id, i.id, 30, 'ml'
FROM drinks d,
     ingredients i
WHERE d.name = 'Margarita'
  AND i.name = 'Triple Sec'
UNION ALL
SELECT d.id, i.id, 30, 'ml'
FROM drinks d,
     ingredients i
WHERE d.name = 'Margarita'
  AND i.name = 'Sok z limonki'
UNION ALL
SELECT d.id, i.id, 150, 'ml'
FROM drinks d,
     ingredients i
WHERE d.name = 'Jagerbomb'
  AND i.name = 'Redbull'
UNION ALL
SELECT d.id, i.id, 40, 'ml'
FROM drinks d,
     ingredients i
WHERE d.name = 'Jagerbomb'
  AND i.name = 'Jagermaister';

-- Mock orders
INSERT INTO orders (drink_name, ingredients, recipe, guest_name, order_timestamp, served)
VALUES ('Custom Mojito', '60ml Rum, 20ml sok z limonki, 2 liście mięty, syrop cukrowy, woda gazowana',
        'Zmiażdż liście mięty z syropem cukrowym, dodaj rum i sok z limonki, wymieszaj z lodem i uzupełnij wodą gazowaną',
        'Jan Kowalski', CURRENT_TIMESTAMP - INTERVAL '2' HOUR, true),
       ('Spicy Margarita', '60ml Tequila, 30ml Triple Sec, 30ml sok z limonki, płatki chili',
        'Połącz składniki w shakerze, wstrząśnij z lodem, podawaj w szkle z solą na brzegu', 'Anna Nowak',
        CURRENT_TIMESTAMP - INTERVAL '1' HOUR, true),
       ('Tropical Paradise', '50ml Rum kokosowy, 100ml sok ananasowy, 20ml syrop kokosowy',
        'Wszystkie składniki wymieszaj w shakerze z lodem, przelej do wysokiej szklanki', 'Marek Wiśniewski',
        CURRENT_TIMESTAMP - INTERVAL '30' MINUTE, false),
       ('Blue Lagoon', '40ml Wódka, 20ml Blue Curacao, 100ml Sprite',
        'Połącz składniki w szklance z lodem, delikatnie wymieszaj, udekoruj plasterkiem pomarańczy',
        'Katarzyna Lewandowska', CURRENT_TIMESTAMP - INTERVAL '15' MINUTE, false),
       ('Virgin Colada', '100ml sok ananasowy, 50ml mleczko kokosowe, 20ml syrop cukrowy',
        'Zblenduj wszystkie składniki z kruszonym lodem, podawaj z plasterkiem ananasa', 'Tomasz Zieliński',
        CURRENT_TIMESTAMP - INTERVAL '5' MINUTE, false);