
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- DATABASE NAME : KidProQuo

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "groups" (
    "id" SERIAL PRIMARY KEY,
    "group_name" VARCHAR NOT NULL,
    "passcode" VARCHAR NOT NULL,
    "family_passcode" VARCHAR 
);

CREATE TABLE "family" (
    "id" SERIAL PRIMARY KEY,
    "first_name1" VARCHAR (50) NOT NULL,
    "last_name1" VARCHAR (50) NOT NULL,
    "first_name2" VARCHAR,
    "last_name2" VARCHAR,
    "email" VARCHAR (100) NOT NULL,
    "street_address" VARCHAR,
    "city" VARCHAR,
    "state" VARCHAR,
    "zip_code" VARCHAR,
    "phone_number" VARCHAR NOT NULL,
    "image" VARCHAR,
    "user_id" INT REFERENCES "user",
    "family_passcode" VARCHAR,
    "group_id" INT REFERENCES "groups"
);

CREATE TABLE "kid" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (50) NOT NULL,
    "last_name" VARCHAR (50) NOT NULL,
    "birthdate" DATE NOT NULL,
    "allergies" VARCHAR,
    "medication" VARCHAR,
    "image" VARCHAR,
    "family_id" INT REFERENCES "family"
);

CREATE TABLE "event" (
    "id" SERIAL PRIMARY KEY,
    "event_date" varchar(200),
    "event_time_start" TIME NOT NULL,
    "event_time_end" TIME NOT NULL,
    "total_hours" INTEGER,
    "event_confirmed" BOOLEAN,
    "requester_id" INT REFERENCES "family",
    "claimer_id" INT REFERENCES "family",
    "group_id" INT REFERENCES "groups",
    "notes" varchar(300),
    "offer_needed" Boolean,
    "event_claimed" Boolean DEFAULT FALSE
);

CREATE TABLE "feed" (
    "id" SERIAL PRIMARY KEY,
    "event_id" INT REFERENCES "event"
);

CREATE TABLE "hours" (
    "id" SERIAL PRIMARY KEY,
    "hours_banked" INT REFERENCES "event",
    "hours_used" INT REFERENCES "event",
    "user_id" INT REFERENCES "user"
);

-- INSERT QUERIES --

INSERT INTO "user"
    ("username", "password")
VALUES('steve', '1234'),
    ('joyce', '4321');

INSERT INTO "groups"
    ("family_id", "group_name", "passcode", "family_passcode")
VALUES('3', 'Whittier', '1234', '');

INSERT INTO "event"
    ("event_date", "event_time_start", "event_time_end", "total_hours", "event_confirmed", "requester_id", "claimer_id", "group_id", "notes", "offer_needed")
VALUES('2019-09-12', '2:00pm', '4:00pm', '2', 'false', '4', '3', '1', 'Hi', true),
    ('2019-10-02', '6:00pm', '9:00pm', '3', 'true', '3', '4', '1', 'We need help!', true);

INSERT INTO "family"
    ("first_name1", "last_name1", "first_name2", "last_name2", "email", "street_address", "city", "state", "zip_code", "phone_number", "image", "user_id", "family_passcode", "group_id")
VALUES('Steve', 'Harrington', 'Nancy', 'Harrington', 'steve@hawkins.com', '500 Maple Drive', 'Hawkins', 'IN', '34567', '984-494-2943', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjr3YX3vLzkAhULrZ4KHZ1lDS4QjRx6BAgBEAQ&url=https%3A%2F%2Ffromthehipphoto.com%2Ffocus%2Fwhat-to-wear-for-family-photos%2F&psig=AOvVaw1VXCz5TYPl0zh-PAKohEEu&ust=1567868897232577', '1', '1234', '1'),
    ('Joyce', 'Byers', 'Jim', 'Byers', 'joyce@hawkins.com', '333 Dungeon Drive', 'Hawkins', 'IN', '34567', '984-345-3464', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiWsq-WvbzkAhUCj54KHYJQC68QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.priyagoswami.com%2Fworks%2Ffamily-portraits%2F&psig=AOvVaw1VXCz5TYPl0zh-PAKohEEu&ust=1567868897232577', '2', '2222', '1');

INSERT INTO "kid"
    ("first_name","last_name", "birthdate", "allergies", "medication", "image", "family_id")
Values
    ('Maxine', 'Harrington', '01-05-91', 'Pollen, peanuts,', 'Penecillin',
        'https://www.carters.com/on/demandware.static/-/Sites-Carters-Library/default/dw7a7f95ac/content/carters/images/nav/KG_Fall_2019.jpg', 3);

INSERT INTO "kid"
    ("first_name","last_name", "birthdate", "allergies", "medication", "image", "family_id")
Values
    ('Bill', 'Byers', '01-05-91', 'dust', 'Tylenol',
        'https://cdn.pixabay.com/photo/2014/07/11/22/05/baby-390555_960_720.jpg', 4);
