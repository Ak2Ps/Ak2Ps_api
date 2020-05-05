
CREATE TABLE afdeling (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Afdeling char(3) NOT NULL DEFAULT '',
  Naam varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY AFDELING_UK (Afdeling)
) ;

CREATE TABLE bb (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Bb varchar(255) NOT NULL DEFAULT '',
  Omschrijving varchar(255) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY BB_I1 (Bb)
);

CREATE TABLE bbmsg (
  IdMaster int(10) DEFAULT NULL,
  Id int(10) NOT NULL AUTO_INCREMENT,
  Bb varchar(255) NOT NULL DEFAULT '',
  Author varchar(255) DEFAULT NULL,
  Email varchar(255) DEFAULT NULL,
  Date date DEFAULT NULL,
  Moderated int(10) DEFAULT NULL,
  Header varchar(255) DEFAULT NULL,
  Inhoud longtext,
  PRIMARY KEY (Id),
  KEY BBMSG_I1 (Bb,Date)
);

CREATE TABLE bestelling (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Status varchar(3) DEFAULT NULL,
  LijstStatus varchar(3) DEFAULT NULL,
  Startdatumtijd datetime DEFAULT NULL,
  Productnummer varchar(50) DEFAULT NULL,
  Bestelling decimal(10,0) DEFAULT NULL,
  Besteldatumtijd datetime DEFAULT NULL,
  Leveranciernummer varchar(50) DEFAULT NULL,
  Leveranciernaam varchar(50) DEFAULT NULL,
  Leverancierproductnummer varchar(50) DEFAULT NULL,
  Bestelnummer varchar(50) DEFAULT NULL,
  Regelnummer varchar(50) DEFAULT NULL,
  Geprintdatumtijd datetime DEFAULT NULL,
  Gepickeddatumtijd datetime DEFAULT NULL,
  Verzondendatumtijd datetime DEFAULT NULL,
  Ontvangendatumtijd datetime DEFAULT NULL,
  Contactpersoon varchar(254) DEFAULT NULL,
  Inkoopprijs decimal(16,8) DEFAULT NULL,
  Opmerking longtext,
  PRIMARY KEY (Id),
  KEY BESTELLING_I1 (Productnummer,Besteldatumtijd),
  KEY BESTELLING_I2 (Leveranciernummer,Productnummer),
  KEY BESTELLING_I3 (Leveranciernaam,Productnummer),
  KEY BESTELLING_I4 (Bestelnummer,Productnummer)
);

CREATE TABLE bestellingcommentaar (
  Id int(10) NOT NULL AUTO_INCREMENT,
  BestellingId int(10) DEFAULT NULL,
  Regelnummer int(10) DEFAULT NULL,
  Commentaar varchar(254) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY BESTELLINGCOMMENTAAR_I1 (BestellingId,Regelnummer)
);

CREATE TABLE bestellingpick (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Bestelnummer varchar(50) DEFAULT NULL,
  Bestelregel varchar(50) DEFAULT NULL,
  Status varchar(3) DEFAULT NULL,
  Productnummer varchar(50) DEFAULT NULL,
  Onderdeelnummer varchar(50) DEFAULT NULL,
  Bestelling decimal(10,0) DEFAULT NULL,
  Faktor decimal(17,7) DEFAULT NULL,
  Gepickeddatumtijd datetime DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY BESTELLINGPICK_I1 (Bestelnummer,Productnummer)
) ;

CREATE TABLE bewerking (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Status varchar(3) DEFAULT NULL,
  Bewerkingsnummer varchar(10) DEFAULT NULL,
  Productnummer varchar(50) DEFAULT NULL,
  Productieaantal decimal(10,0) DEFAULT NULL,
  Startaantal decimal(10,0) DEFAULT NULL,
  InitStartdatumtijd datetime DEFAULT NULL,
  Startdatumtijd datetime DEFAULT NULL,
  lijn varchar(50) DEFAULT NULL,
  Plandatumtijd datetime DEFAULT NULL,
  AdviesPlandatumtijd datetime DEFAULT NULL,
  ExactPlandatumtijd datetime DEFAULT NULL,
  Einddatumtijd datetime DEFAULT NULL,
  Eindcontrolenummer varchar(10) DEFAULT NULL,
  Opmerking longtext,
  PRIMARY KEY (Id),
  KEY BEWERKING_I1 (Bewerkingsnummer,Productnummer),
  KEY BEWERKING_I2 (Productnummer,Startdatumtijd)
);

CREATE TABLE bewerkingflow (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Bewerkingsnummer varchar(10) DEFAULT NULL,
  Volgnummer int(10) DEFAULT NULL,
  Bewerkingsoort varchar(1) DEFAULT NULL,
  Bewerkingaantal decimal(10,0) DEFAULT NULL,
  Startdatumtijd datetime DEFAULT NULL,
  lijn varchar(50) DEFAULT NULL,
  Geprint varchar(1) DEFAULT NULL,
  Plandatumtijd datetime DEFAULT NULL,
  Einddatumtijd datetime DEFAULT NULL,
  Eindcontrolenummer varchar(10) DEFAULT NULL,
  Uitval decimal(10,0) DEFAULT NULL,
  Tekeningnummer varchar(50) DEFAULT NULL,
  Tekeningrevisie varchar(50) DEFAULT NULL,
  Tekeningdatumtijd datetime DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY BEWERKINGFLOW_I1 (Bewerkingsnummer,Volgnummer,Bewerkingsoort)
);

CREATE TABLE bewerkingsoort (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Bewerkingsoort char(1) NOT NULL DEFAULT '',
  Naam varchar(50) DEFAULT NULL,
  volgorde varchar(50) DEFAULT NULL,
  Kleur varchar(50) DEFAULT NULL,
  Voortgang varchar(1) DEFAULT NULL,
  Afkorting varchar(50) DEFAULT NULL,
  Layout varchar(50) DEFAULT NULL,
  Reparatie varchar(1) DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY BEWERKINGSOORT_UK (Bewerkingsoort)
);

CREATE TABLE bewerkingtijd (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Bewerkingsnummer varchar(10) DEFAULT NULL,
  Productnummer varchar(50) DEFAULT NULL,
  BewerkingFlowId int(10) DEFAULT NULL,
  Afdeling char(3) DEFAULT NULL,
  Gebruiker varchar(255) DEFAULT NULL,
  Bewerkingsoort char(1) DEFAULT NULL,
  Startdatumtijd datetime DEFAULT NULL,
  Einddatumtijd datetime DEFAULT NULL,
  AantalGemaakt decimal(10,0) DEFAULT NULL,
  AantalUitval varchar(10) DEFAULT NULL,
  Tijd decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY BEWERKINGTIJD_I1 (Bewerkingsnummer,Productnummer),
  KEY BEWERKINGTIJD_I2 (Productnummer,Startdatumtijd),
  KEY BEWERKINGTIJD_I3 (BewerkingFlowId),
  KEY BEWERKINGTIJD_I4 (Startdatumtijd,Gebruiker)
);

CREATE TABLE bewerkinguitval (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Bewerkingsnummer varchar(10) DEFAULT NULL,
  Productnummer varchar(50) DEFAULT NULL,
  BewerkingFlowId int(10) DEFAULT NULL,
  Afdeling char(3) DEFAULT NULL,
  Gebruiker varchar(255) DEFAULT NULL,
  Uitval varchar(10) DEFAULT NULL,
  AantalAfkeur decimal(10,0) DEFAULT NULL,
  AantalReparatie decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY BEWERKINGUITVAL_I1 (Bewerkingsnummer,Productnummer),
  KEY BEWERKINGUITVAL_I2 (Productnummer),
  KEY BEWERKINGUITVAL_I3 (BewerkingFlowId)
);

CREATE TABLE gebruiker (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Gebruiker varchar(255) NOT NULL DEFAULT '',
  Naam varchar(255) DEFAULT NULL,
  Adres varchar(255) DEFAULT NULL,
  Woonplaats varchar(255) DEFAULT NULL,
  Land varchar(255) DEFAULT NULL,
  Email varchar(255) DEFAULT NULL,
  Contactpersoon varchar(255) DEFAULT NULL,
  Telefoon varchar(255) DEFAULT NULL,
  Menu varchar(255) DEFAULT NULL,
  Wachtwoord varchar(255) DEFAULT NULL,
  Afdeling varchar(3) DEFAULT NULL,
  Aktief varchar(50) DEFAULT NULL,
  Token varchar(50) DEFAULT NULL,
  Handtekening varchar(255) DEFAULT NULL,
  badge1 varchar(50) DEFAULT NULL,
  badge2 varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY GEBRUIKER_I1 (Gebruiker),
  KEY GEBRUIKER_I2 (badge1,Gebruiker),
  KEY GEBRUIKER_I3 (badge2,Gebruiker)
);

CREATE TABLE gebruikerplan (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Gebruiker varchar(255) DEFAULT NULL,
  Startdatumtijd datetime DEFAULT NULL,
  Einddatumtijd datetime DEFAULT NULL,
  Plansoort varchar(3) DEFAULT NULL,
  Tijd decimal(10,0) DEFAULT NULL,
  Pauze decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY GEBRUIKERPLAN_I1 (Gebruiker,Startdatumtijd),
  KEY GEBRUIKERPLAN_I2 (Startdatumtijd,Gebruiker)
);

CREATE TABLE klant (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Klantnummer varchar(50) DEFAULT NULL,
  Naam varchar(255) DEFAULT NULL,
  Zoekcode varchar(50) DEFAULT NULL,
  Adres varchar(255) DEFAULT NULL,
  Woonplaats varchar(255) DEFAULT NULL,
  Postcode varchar(50) DEFAULT NULL,
  Telefoon varchar(50) DEFAULT NULL,
  Fax varchar(50) DEFAULT NULL,
  EMail varchar(50) DEFAULT NULL,
  Categorie varchar(50) DEFAULT NULL,
  Contact varchar(255) DEFAULT NULL,
  Land varchar(50) DEFAULT NULL,
  Leverdagen decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY KLANT_I1 (Klantnummer),
  KEY KLANT_I2 (Zoekcode)
);

CREATE TABLE leverancier (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Leveranciernummer varchar(50) DEFAULT NULL,
  Naam varchar(255) DEFAULT NULL,
  Zoekcode varchar(50) DEFAULT NULL,
  Adres varchar(255) DEFAULT NULL,
  Woonplaats varchar(255) DEFAULT NULL,
  Postcode varchar(50) DEFAULT NULL,
  Telefoon varchar(50) DEFAULT NULL,
  Fax varchar(50) DEFAULT NULL,
  EMail varchar(50) DEFAULT NULL,
  Categorie varchar(50) DEFAULT NULL,
  Contact varchar(255) DEFAULT NULL,
  Land varchar(50) DEFAULT NULL,
  Leverdagen decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY LEVERANCIER_I1 (Leveranciernummer),
  KEY LEVERANCIER_I2 (Zoekcode)
);


CREATE TABLE menu_2015 (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Menu varchar(255) NOT NULL,
  PRIMARY KEY (Id),
  KEY MENU_I1 (Menu)
);

CREATE TABLE menuregel_2015 (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Menu varchar(255) NOT NULL,
  Volgnummer int(10) NOT NULL,
  Omschrijving varchar(255) DEFAULT NULL,
  Submenu varchar(255) DEFAULT NULL,
  Link varchar(255) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY MENUREGEL_I1 (Menu,Volgnummer)
);

CREATE TABLE onderdeel (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Productnummer varchar(50) DEFAULT NULL,
  Onderdeelnummer varchar(50) DEFAULT NULL,
  Faktor decimal(17,7) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY ONDERDEEL_I1 (Onderdeelnummer,Productnummer),
  KEY ONDERDEEL_I2 (Productnummer,Onderdeelnummer)
);

CREATE TABLE param (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Naam varchar(255) NOT NULL DEFAULT '',
  Inhoud varchar(255) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY PARAM_I1 (Naam)
);

CREATE TABLE plansoort (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Soort varchar(3) NOT NULL,
  Naam varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY PLANSOORT_UK (Soort)
);

CREATE TABLE product (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Productnummer varchar(50) DEFAULT NULL,
  Productnaam varchar(50) DEFAULT NULL,
  Voorraad decimal(10,0) DEFAULT NULL,
  Voorraaddatumtijd datetime DEFAULT NULL,
  Eindvoorraad decimal(10,0) DEFAULT NULL,
  TePicken decimal(10,0) DEFAULT NULL,
  TeBestellen decimal(10,0) DEFAULT NULL,
  Soort varchar(50) DEFAULT NULL,
  Lijn varchar(50) DEFAULT NULL,
  Performance decimal(10,0) DEFAULT NULL,
  Inkoopprijs decimal(16,8) DEFAULT NULL,
  InkoopprijsGemiddeld decimal(16,8) DEFAULT NULL,
  Leverdagen decimal(10,0) DEFAULT NULL,
  Locatie varchar(50) DEFAULT NULL,
  Leveranciernummer varchar(50) DEFAULT NULL,
  Leverancierproductnummer varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY PRODUCT_I1 (Productnummer,Voorraaddatumtijd)
);

CREATE TABLE productflow (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Productnummer varchar(50) DEFAULT NULL,
  Volgnummer int(10) DEFAULT NULL,
  Bewerkingsoort varchar(1) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY PRODUCTFLOW_I1 (Productnummer,Volgnummer,Bewerkingsoort)
);

CREATE TABLE productgroep (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Productgroep varchar(50) NOT NULL,
  MetOnderdelen varchar(1) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY PRODUCTGROEP_I1 (Productgroep)
);

CREATE TABLE productgroepregel (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Productgroep varchar(50) NOT NULL,
  Productnummer varchar(50) DEFAULT NULL,
  IsOnderdeel varchar(1) DEFAULT NULL,
  Volgnummer int(10) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY PRODUCTGROEPREGEL_I1 (Productgroep,Productnummer),
  KEY PRODUCTGROEPREGEL_I2 (Productnummer,Productgroep)
);

CREATE TABLE productlijn (
  Id int(10) NOT NULL AUTO_INCREMENT,
  ProductLijn varchar(50) NOT NULL,
  ProductLijnNaam varchar(50) DEFAULT NULL,
  Productielijn varchar(50) DEFAULT NULL,
  ProductieLijnNaam varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY PRODUCTLIJN_I1 (ProductLijn,Productielijn),
  KEY PRODUCTLIJN_I2 (Productielijn,ProductLijn)
);

CREATE TABLE productopmerking (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Productnummer varchar(50) DEFAULT NULL,
  Bron varchar(50) DEFAULT NULL,
  Opmerking longtext,
  PRIMARY KEY (Id),
  KEY PRODUCTOPMERKING_I1 (Productnummer,Bron)
);


CREATE TABLE productvoorraad (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Status varchar(3) DEFAULT NULL,
  Productnummer varchar(50) DEFAULT NULL,
  Voorraad decimal(10,0) DEFAULT NULL,
  Voorraaddatumtijd datetime DEFAULT NULL,
  Actie varchar(255) DEFAULT NULL,
  ActieOmschrijving varchar(255) DEFAULT NULL,
  Actiedatumtijd datetime DEFAULT NULL,
  Actievoorraad decimal(10,0) DEFAULT NULL,
  Actienummer varchar(50) DEFAULT NULL,
  TeBestellen decimal(10,0) DEFAULT NULL,
  Besteld decimal(10,0) DEFAULT NULL,
  Onderdelen decimal(10,0) DEFAULT NULL,
  Expanded decimal(10,0) DEFAULT NULL,
  Beperkstatus varchar(50) DEFAULT NULL,
  Beperknummer varchar(50) DEFAULT NULL,
  Beperkdatumtijd datetime DEFAULT NULL,
  Initdatumtijd datetime DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY PRODUCTVOORRAAD_I1 (Productnummer,Voorraaddatumtijd)
);

CREATE TABLE productvraag (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Ordernummer varchar(50) DEFAULT NULL,
  Regelnummer varchar(50) DEFAULT NULL,
  Orderreferentie varchar(50) DEFAULT NULL,
  Orderdatumtijd datetime DEFAULT NULL,
  Productnummer varchar(50) DEFAULT NULL,
  Initvraag decimal(10,0) DEFAULT NULL,
  Vraag decimal(10,0) DEFAULT NULL,
  Initvraagdatumtijd datetime DEFAULT NULL,
  Acceptdatumtijd datetime DEFAULT NULL,
  Klantnummer varchar(50) DEFAULT NULL,
  Klantnaam varchar(50) DEFAULT NULL,
  Einddatumtijd datetime DEFAULT NULL,
  Opmerking longtext,
  Vraagdatumtijd datetime DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY PRODUCTVRAAG_I1 (Productnummer,Vraagdatumtijd),
  KEY PRODUCTVRAAG_I2 (Klantnummer,Productnummer),
  KEY PRODUCTVRAAG_I3 (Klantnaam,Productnummer),
  KEY PRODUCTVRAAG_I4 (Ordernummer)
);

CREATE TABLE retour (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Referentie varchar(50) DEFAULT NULL,
  Klantreferentie varchar(50) DEFAULT NULL,
  Startdatumtijd datetime DEFAULT NULL,
  Gereeddatumtijd datetime DEFAULT NULL,
  Gebruiker varchar(255) DEFAULT NULL,
  Type varchar(50) DEFAULT NULL,
  Termijn varchar(50) DEFAULT NULL,
  Prijsopgave varchar(50) DEFAULT NULL,
  Garantie varchar(50) DEFAULT NULL,
  Kosten decimal(16,8) DEFAULT NULL,
  Opmerking longtext,
  Status varchar(3) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY RETOUR_I1 (Referentie),
  KEY RETOUR_I2 (Klantreferentie)
);

CREATE TABLE retouractie (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Referentie varchar(50) DEFAULT NULL,
  Actie varchar(50) DEFAULT NULL,
  Gebruiker varchar(255) DEFAULT NULL,
  Garantie varchar(50) DEFAULT NULL,
  Kosten decimal(16,8) DEFAULT NULL,
  Gereeddatumtijd datetime DEFAULT NULL,
  Opmerking longtext,
  PRIMARY KEY (Id),
  KEY RETOURACTIE_I1 (Referentie,Actie),
  KEY RETOURACTIE_I2 (Actie,Referentie)
);

CREATE TABLE retouractietype (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Actie varchar(50) NOT NULL,
  Naam varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY RETOURACTIETYPE_UK (Actie)
);

CREATE TABLE retourgarantie (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Garantie varchar(50) NOT NULL,
  Naam varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY RETOURGARANTIE_UK (Garantie)
);

CREATE TABLE retourgebruiker (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Gebruiker varchar(50) NOT NULL,
  Naam varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY RETOURGEBRUIKER_UK (Gebruiker)
);

CREATE TABLE retourklant (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Referentie varchar(50) DEFAULT NULL,
  Klantnummer varchar(50) DEFAULT NULL,
  Naam varchar(255) DEFAULT NULL,
  Zoekcode varchar(50) DEFAULT NULL,
  Adres varchar(255) DEFAULT NULL,
  Woonplaats varchar(255) DEFAULT NULL,
  Postcode varchar(50) DEFAULT NULL,
  Land varchar(50) DEFAULT NULL,
  Telefoon varchar(50) DEFAULT NULL,
  Fax varchar(50) DEFAULT NULL,
  EMail varchar(50) DEFAULT NULL,
  Aflevernaam varchar(255) DEFAULT NULL,
  Afleveradres varchar(255) DEFAULT NULL,
  Afleverwoonplaats varchar(255) DEFAULT NULL,
  Afleverpostcode varchar(50) DEFAULT NULL,
  AfleverLand varchar(50) DEFAULT NULL,
  AfleverDpdnummer varchar(255) DEFAULT NULL,
  AfleverTelefoon varchar(50) DEFAULT NULL,
  AfleverFax varchar(50) DEFAULT NULL,
  AfleverEMail varchar(50) DEFAULT NULL,
  Contact varchar(255) DEFAULT NULL,
  Opmerking longtext,
  PRIMARY KEY (Id),
  KEY RETOURKLANT_I1 (Referentie,Klantnummer),
  KEY RETOURKLANT_I2 (Klantnummer,Referentie)
);

CREATE TABLE retourproduct (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Referentie varchar(50) DEFAULT NULL,
  Productnummer varchar(50) DEFAULT NULL,
  Aantal decimal(16,0) DEFAULT NULL,
  Klantproductnummer varchar(50) DEFAULT NULL,
  Serienummer varchar(50) DEFAULT NULL,
  Productiedatumtijd datetime DEFAULT NULL,
  Opmerking longtext,
  PRIMARY KEY (Id),
  KEY RETOURPRODUCT_I1 (Referentie,Productnummer),
  KEY RETOURPRODUCT_I2 (Productnummer,Referentie)
);

CREATE TABLE retourtermijn (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Retourtermijn varchar(50) NOT NULL,
  Naam varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY RETOURTERMIJN_UK (Retourtermijn)
);

CREATE TABLE retourtype (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Retourtype varchar(50) NOT NULL,
  Naam varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY RETOURTYPE_UK (Retourtype)
);

CREATE TABLE uitval (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Uitval varchar(10) NOT NULL DEFAULT '',
  Naam varchar(50) DEFAULT NULL,
  Kleur varchar(50) DEFAULT NULL,
  Uitvalsoort varchar(50) DEFAULT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY UITVAL_UK (Uitval)
);

CREATE TABLE vraag (
  Id int(10) NOT NULL AUTO_INCREMENT,
  Status varchar(3) DEFAULT NULL,
  Geprint varchar(1) DEFAULT NULL,
  Ordernummer varchar(50) DEFAULT NULL,
  Orderreferentie varchar(50) DEFAULT NULL,
  Initvraagdatumtijd datetime DEFAULT NULL,
  Vraagdatumtijd datetime DEFAULT NULL,
  Klantnummer varchar(50) DEFAULT NULL,
  Klantnaam varchar(50) DEFAULT NULL,
  Einddatumtijd datetime DEFAULT NULL,
  Opmerking longtext,
  Opmerking2 longtext,
  PRIMARY KEY (Id),
  KEY VRAAG_I1 (Klantnummer,Ordernummer),
  KEY VRAAG_I2 (Klantnaam,Ordernummer),
  KEY VRAAG_I3 (Ordernummer)
);

create VIEW uitvalsoort AS select base.VALUE AS VALUE from (select 'Electrisch' AS VALUE union select 'Mechanisch' AS Mechanisch union select 'Overig' AS Overig) base;
