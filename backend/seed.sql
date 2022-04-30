DELETE FROM food;
DELETE FROM users;

INSERT INTO users (name, gender, dateOfBirth, contact, address, postalCode, email, password)
VALUES
    ('Soh Sing Hian', 'male', '05/03/1992', 98765432, 'Blk 123 Pasir Ris Street 12 #12-284', 123456, 'sohsinghian@gmail.com', 'example');

INSERT INTO food (id, name, image, price, type)
VALUES
    (1, 'Cheese Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651196852/happeats/fries/cheesefries_dopfqq.jpg', 6.80, 'fries'),
    (2, 'Chilli Cheese Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651196979/happeats/fries/chillicheesefries_g4ml9c.webp', 7.80, 'fries'),
    (3, 'Truffle Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651196852/happeats/fries/trufflefries_h1z828.jpg', 12.80, 'fries'),
    (4, 'Shoestring Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651197467/happeats/fries/shoestringfries_arginq.jpg', 6.80, 'fries'),
    (5, 'Tater Tots', 'https://res.cloudinary.com/happeats/image/upload/v1651196851/happeats/fries/tatertots_lzwdwo.webp', 5.80, 'fries'),
    (6, 'Waffle Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651196851/happeats/fries/wafflefries_etqlp9.jpg', 4.80, 'fries'),
    (7, 'Curly Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651196851/happeats/fries/curlyfries_knjo72.jpg', 4.80, 'fries'),
    (8, 'Regular Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651198004/happeats/fries/regularfries_f5y7wf.webp', 3.80, 'fries'),
    (9, 'Fried Chicken', './images/friedchicken.jpeg', 6.90, 'chicken');