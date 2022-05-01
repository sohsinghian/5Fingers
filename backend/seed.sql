DELETE FROM food;
-- DELETE FROM users;

-- INSERT INTO users (name, gender, dateOfBirth, contact, address, postalCode, email, password)
-- VALUES
--     ('Soh Sing Hian', 'male', '05/03/1992', 98765432, 'Blk 123 Pasir Ris Street 12 #12-284', 123456, 'sohsinghian@gmail.com', 'example');

INSERT INTO food (id, name, image, price, type)
VALUES
    (1, 'Cheese Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651378054/happeats/fries/cheesefries_loryak.jpg', 6.80, 'fries'),
    (2, 'Chilli Cheese Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651196979/happeats/fries/chillicheesefries_g4ml9c.webp', 7.80, 'fries'),
    (3, 'Truffle Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651196852/happeats/fries/trufflefries_h1z828.jpg', 12.80, 'fries'),
    (4, 'Shoestring Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651378188/happeats/fries/shoestringfries_sr5fpo.jpg', 6.80, 'fries'),
    (5, 'Tater Tots', 'https://res.cloudinary.com/happeats/image/upload/v1651196851/happeats/fries/tatertots_lzwdwo.webp', 5.80, 'fries'),
    (6, 'Waffle Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651196851/happeats/fries/wafflefries_etqlp9.jpg', 4.80, 'fries'),
    (7, 'Curly Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651196851/happeats/fries/curlyfries_knjo72.jpg', 4.80, 'fries'),
    (8, 'Regular Fries', 'https://res.cloudinary.com/happeats/image/upload/v1651379820/happeats/fries/regularfries_hqiki1.jpg', 3.80, 'fries'),
    (9, 'Hot Wings', 'https://res.cloudinary.com/happeats/image/upload/v1651381344/happeats/chicken/hotchickenwings_xsa6qm.jpg', 10.90, 'chicken'),
    (10, 'Smoked Wings', 'https://res.cloudinary.com/happeats/image/upload/v1651381318/happeats/chicken/smokedchicken_vg8tic.jpg', 10.90, 'chicken'),
    (11, 'Garlic Butter Wings', 'https://res.cloudinary.com/happeats/image/upload/v1651381379/happeats/chicken/garlicbutterwings_tppw1h.jpg', 9.90, 'chicken'),
    (12, 'Fried Wings', 'https://res.cloudinary.com/happeats/image/upload/v1651381399/happeats/chicken/friedchicken_jdbmjt.webp', 8.90, 'chicken'),
    (13, 'Lemon Pepper Wings', 'https://res.cloudinary.com/happeats/image/upload/v1651381416/happeats/chicken/lemonpepperwings_wghkq1.jpg', 8.90, 'chicken'),
    (14, 'Five Spiced Grilled Wings', 'https://res.cloudinary.com/happeats/image/upload/v1651381445/happeats/chicken/fivespicedgrilledchickenwings_wcerlh.jpg', 9.90, 'chicken'),
    (15, 'Classic Milk Tea', 'https://res.cloudinary.com/happeats/image/upload/v1651384435/happeats/beverages/milktea_vyrzpz.jpg', 3.90, 'beverages'),
    (16, 'Taro Milk Tea', 'https://res.cloudinary.com/happeats/image/upload/v1651384419/happeats/beverages/taromilktea_tikrue.jpg', 4.90, 'beverages');


