

CREATE DATABASE ips_db;
SET FOREIGN_KEY_CHECKS=0;
USE ips_db;





CREATE TABLE IF NOT EXISTS envases (
    envase VARCHAR(49) PRIMARY KEY,
    despacho VARCHAR(30),
    nroEnvase VARCHAR(9),
    claseEnvase VARCHAR(60),
    claseEnvios VARCHAR(60),
    pesoEnvase FLOAT,
    cantEnvios INT,
    paisOrigen  VARCHAR(65),
    paisDestino  VARCHAR(65),
    estadoEnvase VARCHAR(35),
    indicadorEstado VARCHAR(35),
    ultimaModificacion VARCHAR(40),
    tipoAcontecimiento VARCHAR(90)
);


CREATE TABLE IF NOT EXISTS envios (
    envio VARCHAR(13) PRIMARY KEY,
    pesoPreaviso FLOAT,
    envase VARCHAR(29),
    claseEnvio VARCHAR(30),
    estadoActual VARCHAR(43),
    ultimoAcontecimiento VARCHAR(80),
    paisOrigen VARCHAR(45),
    paisDestino  VARCHAR(45),
    ultimaModificacion VARCHAR(20),
    identificadorLocal VARCHAR(12),
    manifiesto VARCHAR(18),
    pesoEspecificado FLOAT,
    destino_cl VARCHAR(50),
    estado_aduana VARCHAR(30),
    id_lote VARCHAR(50)
    CONSTRAINT FK_enviosenvases FOREIGN KEY (envase)
    REFERENCES envases(envase)
    CONSTRAINT FK_envioslote FOREIGN KEY (id_lote)
    REFERENCES lotes(lote)
);

CREATE TABLE IF NOT EXIST lotes(
    id_lote VARCHAR(50) PRIMARY KEY,
    estado_aduana VARCHAR(30),
    estado_despacho VARCHAR(40)   
)





CREATE TABLE IF NOT EXISTS trazabilidad (
    idEnvio VARCHAR(13) PRIMARY KEY,
    tipoDeAcontecimiento VARCHAR(80),
    fecha TIMESTAMP,
    oficina VARCHAR(45),
    estado VARCHAR(50),
    motivoRetencion VARCHAR(50),
    usuario VARCHAR(50),
    posicionDeTrabajo VARCHAR(50),
    idEnvase VARCHAR(29),
    CONSTRAINT FK_trazabilidadenvios FOREIGN KEY (idEnvio)
    REFERENCES envios(envio)

);


CREATE TABLE IF NOT EXISTS enviocache(
    envio VARCHAR(13) PRIMARY KEY,
    pesoPreaviso FLOAT,
    envase VARCHAR(29),
    claseEnvio VARCHAR(30),
    estadoActual VARCHAR(43),
    ultimoAcontecimiento VARCHAR(80),
    paisOrigen VARCHAR(45),
    paisDestino  VARCHAR(45),
    ultimaModificacion VARCHAR(20),
    identificadorLocal VARCHAR(12),
    manifiesto VARCHAR(18),
    pesoEspecificado FLOAT,
    destino_cl VARCHAR(50),
    estado_aduana VARCHAR(30),
    id_lote VARCHAR(50)
);



SET FOREIGN_KEY_CHECKS=0;
INSERT INTO envios (envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal)  VALUES ('CH198884460US', '6300.00', 'USLAXACLSCLEACN30626002900063', 'C (Encomiendas (CP))', 'MINL (Normal)', 'Registra Informacion de Envio en Proceso Aduana (Inb)', 'US (United States of America (the))', 'CL (Chile)', '12-02-2023 15:42', '') ;
INSERT INTO envios (envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal)  VALUES ('CP435601315DE', '14720.00', 'DEFRAACLSCLGBCN31094003000149', 'C (Encomiendas (CP))', 'MINL (Normal)', 'Registra Informacion de Envio en Proceso Aduana (Inb)', 'DE (Germany)', 'CL (Chile)', '12-02-2023 15:42', '');
INSERT INTO envios (envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal)  VALUES ('CY138411900US', '8240.00', 'USORDACLSCLEACN30546005900113', 'C (Encomiendas (CP))', 'MINL (Normal)', 'Registra Informacion de Envio en Proceso Aduana (Inb)', 'US (United States of America (the))', 'CL (Chile)', '12-02-2023 15:43', '');
INSERT INTO envios (envio, pesoPreaviso, envase, claseEnvio, estadoActual, ultimoAcontecimiento, paisOrigen, paisDestino, ultimaModificacion, identificadorLocal)  VALUES ('CJ499175876US', '3460.00', 'USLAXACLSCLEACN30593002900034', 'C (Encomiendas (CP))', 'MINL (Normal)', 'Registra Informacion de Envio en Proceso Aduana (Inb)', 'US (United States of America (the))', 'CL (Chile)', '12-02-2023 15:43', '');