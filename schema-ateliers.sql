-- À exécuter dans Neon (console SQL)
-- Table ateliers & petits événements Woof Day

CREATE TABLE IF NOT EXISTS ateliers (
  id                 UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  titre              TEXT         NOT NULL,
  description        TEXT,
  type               TEXT         NOT NULL DEFAULT 'atelier',
  date               DATE,
  heure              TEXT,
  lieu               TEXT,
  duree              TEXT,
  animateur          TEXT,
  capacite           INTEGER,
  prix               TEXT,
  visible            BOOLEAN      NOT NULL DEFAULT false,
  inscription_ouverte BOOLEAN     NOT NULL DEFAULT false,
  inscription_url    TEXT,
  notes              TEXT,
  display_order      INTEGER      NOT NULL DEFAULT 0,
  created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ
);
