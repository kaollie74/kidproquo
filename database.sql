
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
    "user_id" INTEGER NOT NULL,
    "family_passcode" VARCHAR NOT NULL
);
CREATE TABLE "kid" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (50) NOT NULL,
    "last_name" VARCHAR (50) NOT NULL,
    "birthdate" DATE NOT NULL,
    "allergies" VARCHAR,
    "medication" VARCHAR,
    "image" VARCHAR,
    "family_id" INTEGER NOT NULL
);
CREATE TABLE "groups" (
    "id" SERIAL PRIMARY KEY,
    "family_id" INTEGER NOT NULL,
    "group_name" VARCHAR NOT NULL,
    "passcode" VARCHAR NOT NULL,
    "family_passcode" VARCHAR NOT NULL
);
CREATE TABLE "feed" (
    "id" SERIAL PRIMARY KEY,
    "event_offered_id" INTEGER,
    "event_needed_id" INTEGER
);
CREATE TABLE "event_needed" (
    "id" SERIAL PRIMARY KEY,
    "event_date" DATE NOT NULL,
    "event_time_start" TIME NOT NULL,
    "event_time_end" TIME NOT NULL,
    "total_hours" INTEGER NOT NULL,
    "event_confirmed" BOOLEAN,
    "requester_id" INTEGER NOT NULL,
    "claimer_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
);
CREATE TABLE "event_offered" (
    "id" SERIAL PRIMARY KEY,
    "event_date" DATE NOT NULL,
    "event_time_start" TIME NOT NULL,
    "event_time_end" TIME NOT NULL,
    "total_hours" INTEGER NOT NULL,
    "event_confirmed" BOOLEAN,
    "requester_id" INTEGER NOT NULL,
    "claimer_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL
);
CREATE TABLE "hours" (
    "id" SERIAL PRIMARY KEY,
    "hours_banked" INTEGER,
    "hours_used" INTEGER,
    "user_id" INTEGER NOT NULL
);
