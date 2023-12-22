-- Luodaan tietokanta
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_text TEXT,
  option1 TEXT,
  option2 TEXT,
  option3 TEXT,
  correct_option INT
);

-- Lisätään tietovisakysymykset
INSERT INTO questions (question_text, option1, option2, option3, option4, correct_option) VALUES ('Mikä on Japanin kansalliskukka?', 'Kirsikankukka', 'Kameliakukka', 'Persikkakukka', 'Krysanteemi' 1);
INSERT INTO questions (question_text, option1, option2, option3, option4, correct_option) VALUES ('Mikä on Kanadan pääkaupunki?', 'Toronto', 'Ottawa', 'Mississauga', 'Vancouver' 2);
INSERT INTO questions (question_text, option1, option2, option3, option4, correct_option) VALUES ('Missä sijaitsee Machu Picchu, kuuluisa inkavaltakunnan rauniokaupunki?', 'Brasiliassa', 'Meksikossa', 'Perussa', 'Kolumbiassa' 3);
INSERT INTO questions (question_text, option1, option2, option3, option4, correct_option) VALUES ('Mikä on maailman väkirikkain kaupunki?', 'Mumbai', 'Peking', 'Tokio', 'Delhi' 1);
INSERT INTO questions (question_text, option1, option2, option3, option4, correct_option) VALUES ('Mikä on maailman suurin saari?', 'Kauai', 'Borneo', 'Australia', 'Grönlanti' 4);