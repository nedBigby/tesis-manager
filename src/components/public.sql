CREATE DOMAIN public.dom_aprobacion
    AS character varying(16)
    DEFAULT 'NR'::character varying;

CREATE DOMAIN public.dom_cedula
    AS bigint;

CREATE DOMAIN public.dom_correo
    AS character varying(64);

CREATE DOMAIN public.dom_modalidad
    AS character varying(64);

ALTER DOMAIN public.dom_modalidad
    ADD CONSTRAINT dom_modalidad_check CHECK (VALUE::text = 'Instrumental'::text OR VALUE::text = 'Experimental'::text);

CREATE DOMAIN public.dom_nombre
    AS character varying(128);

CREATE DOMAIN public.dom_telefono
    AS bigint;

CREATE DOMAIN public.dom_veredicto
    AS character varying(16)
    DEFAULT 'PE'::character varying;

ALTER DOMAIN public.dom_veredicto
    ADD CONSTRAINT dom_veredicto_check CHECK (VALUE::text = 'A'::text OR VALUE::text = 'R'::text OR VALUE::text = 'PE'::text);

CREATE TABLE public.profesores
(
    cedula_p dom_cedula NOT NULL,
    nombre_p dom_nombre NOT NULL,
    direccion_p character varying(64) NOT NULL,
    correo_p dom_correo NOT NULL,
    telefono_p dom_telefono NOT NULL,
    CONSTRAINT profesores_pkey PRIMARY KEY (cedula_p),
    CONSTRAINT profesores_telefono_p_key UNIQUE (telefono_p)

);

CREATE TABLE public.instituciones
(
    cod_inst SERIAL NOT NULL,
    nombre_inst dom_nombre COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT instituciones_pkey PRIMARY KEY (cod_inst)
);

CREATE TABLE public.especialidades
(
    cod_esp SERIAL NOT NULL,
    nombre_esp dom_nombre COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT especialidades_pkey PRIMARY KEY (cod_esp)
);

CREATE TABLE public.empresas
(
    cod_emp SERIAL NOT NULL,
    nombre_emp dom_nombre COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT empresas_pkey PRIMARY KEY (cod_emp)
);

CREATE TABLE public.comites
(
    id_comite SERIAL NOT NULL,
    fec_asignacion date NOT NULL,
    fec_realizacion date NOT NULL,
    CONSTRAINT comites_pkey PRIMARY KEY (id_comite)
);


CREATE TABLE public.consejos
(
    num_consejo SERIAL NOT NULL,
    fec_consejo date NOT NULL,
    CONSTRAINT consejos_pkey PRIMARY KEY (num_consejo)
);




CREATE TABLE public.comites_x_internos
(
    id_comite SERIAL NOT NULL,
    cedula_p dom_cedula NOT NULL,
    CONSTRAINT comites_x_internos_pkey PRIMARY KEY (id_comite, cedula_p),
    CONSTRAINT comites_x_internos_id_comite_key UNIQUE (id_comite)
,
    CONSTRAINT comites_x_internos_cedula_p_fkey FOREIGN KEY (cedula_p)
        REFERENCES public.profesores (cedula_p) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT comites_x_internos_id_comite_fkey FOREIGN KEY (id_comite)
        REFERENCES public.comites (id_comite) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE public.especializados
(
    cod_esp SERIAL NOT NULL,
    cedula_p dom_cedula NOT NULL,
    CONSTRAINT especializados_pkey PRIMARY KEY (cod_esp, cedula_p),
    CONSTRAINT especializados_cedula_p_fkey FOREIGN KEY (cedula_p)
        REFERENCES public.profesores (cedula_p) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT especializados_cod_esp_fkey FOREIGN KEY (cod_esp)
        REFERENCES public.especialidades (cod_esp) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);


CREATE TABLE public.foraneos
(
    cedula_p dom_cedula NOT NULL,
    cod_institucion integer,
    CONSTRAINT foraneos_pkey PRIMARY KEY (cedula_p),
    CONSTRAINT foraneos_cedula_p_fkey FOREIGN KEY (cedula_p)
        REFERENCES public.profesores (cedula_p) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT foraneos_cod_institucion_fkey FOREIGN KEY (cod_institucion)
        REFERENCES public.instituciones (cod_inst) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
        NOT VALID
);

CREATE TABLE public.tesistas
(
    cedula_t dom_cedula NOT NULL,
    nombre_t dom_nombre NOT NULL,
    correo_ucab_t dom_correo NOT NULL,
    correo_particular_t dom_correo NOT NULL,
    telefono_contacto_t bigint NOT NULL,
    CONSTRAINT tesistas_pkey PRIMARY KEY (cedula_t),
    CONSTRAINT tesistas_correo_particular_t_key UNIQUE (correo_particular_t)
,
    CONSTRAINT tesistas_correo_ucab_t_key UNIQUE (correo_ucab_t)
,
    CONSTRAINT tesistas_telefono_contacto_t_key UNIQUE (telefono_contacto_t)

);

CREATE TABLE public.trabajos_grado
(
    id_tg SERIAL NOT NULL,
    id_propuesta INT NOT NULL,
    num_consejo integer NOT NULL,
    id_propuesta INT UNIQUE NOT NULL,
    cedula_t dom_cedula NOT NULL,
    modalidad dom_modalidad,
    fec_aprobacion date NOT NULL,
    titulo dom_nombre NOT NULL,
    CONSTRAINT trabajos_grado_pkey PRIMARY KEY (id_tg),
    CONSTRAINT trabajos_grado_cedula_t_key UNIQUE (cedula_t)
,
    CONSTRAINT trabajos_grado_titulo_key UNIQUE (titulo)
,
    CONSTRAINT trabajos_grado_cedula_t_fkey FOREIGN KEY (cedula_t)
        REFERENCES public.tesistas (cedula_t) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE public.instrumentales
(
    id_tg INT NOT NULL,
    cod_emp integer,
    CONSTRAINT instrumentales_pkey PRIMARY KEY (id_tg),
    CONSTRAINT instrumentales_cod_emp_fkey FOREIGN KEY (cod_emp)
        REFERENCES public.empresas (cod_emp) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
        NOT VALID,
    CONSTRAINT instrumentales_id_tg_fkey FOREIGN KEY (id_tg)
        REFERENCES public.trabajos_grado (id_tg) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE public.internos
(
    cedula_p dom_cedula NOT NULL,
    CONSTRAINT internos_pkey PRIMARY KEY (cedula_p),
    CONSTRAINT internos_cedula_p_fkey FOREIGN KEY (cedula_p)
        REFERENCES public.profesores (cedula_p) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE public.jueces
(
    cedula_p dom_cedula NOT NULL,
    nombre_p dom_nombre NOT NULL,
    id_tg integer NOT NULL,
    CONSTRAINT jueces_pkey PRIMARY KEY (cedula_p, id_tg),
    CONSTRAINT jueces_id_tg_fkey FOREIGN KEY (id_tg)
        REFERENCES public.trabajos_grado (id_tg) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE public.participantes_x_consejo
(
    num_consejo integer NOT NULL,
    cedula_p dom_cedula NOT NULL,
    CONSTRAINT participantes_x_consejo_pkey PRIMARY KEY (num_consejo, cedula_p),
    CONSTRAINT participantes_x_consejo_cedula_p_fkey FOREIGN KEY (cedula_p)
        REFERENCES public.profesores (cedula_p) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID,
    CONSTRAINT participantes_x_consejo_num_consejo_fkey FOREIGN KEY (num_consejo)
        REFERENCES public.consejos (num_consejo) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

(
    id_propuesta SERIAL NOT NULL,
    cedula_p dom_cedula,
    id_comite integer,
    estatus_aprobacion dom_aprobacion NOT NULL,
    veredicto_profesor dom_veredicto NOT NULL,
    titulo character varying(128),
    titulo_propuesta character varying(128) NOT NULL,
    observaciones_comite character varying(255) ,
    fec_comite date,
    fec_veredicto date,
    fec_entrega date,
    fec_aprobacion date,
    CONSTRAINT propuestas_pkey PRIMARY KEY (id_propuesta),
    CONSTRAINT propuestas_id_propuesta_key UNIQUE (id_propuesta),
    CONSTRAINT propuestas_titulo_key UNIQUE (titulo)
);



CREATE TABLE public.defensas
(
    fec_pres date NOT NULL,
    cedula_t dom_cedula NOT NULL,
    hora_pres character varying(64) NOT NULL,
    CONSTRAINT defensas_pkey PRIMARY KEY (fec_pres, cedula_t),
    CONSTRAINT defensas_cedula_t_fkey FOREIGN KEY (cedula_t)
        REFERENCES public.tesistas (cedula_t) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);




CREATE TABLE public.experimentales
(
    id_tg INT NOT NULL,
    cedula_p dom_cedula,
    CONSTRAINT experimentales_pkey PRIMARY KEY (id_tg),
    CONSTRAINT experimentales_cedula_p_fkey FOREIGN KEY (cedula_p)
        REFERENCES public.profesores (cedula_p) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
        NOT VALID,
    CONSTRAINT experimentales_id_tg_fkey FOREIGN KEY (id_tg)
        REFERENCES public.trabajos_grado (id_tg) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE public.tutores_empresariales
(
    cod_tutor SERIAL NOT NULL ,
    cod_emp integer NOT NULL,
    nombre_tutor dom_nombre NOT NULL,
    CONSTRAINT tutores_empresariales_pkey PRIMARY KEY (cod_tutor),
    CONSTRAINT tutores_empresariales_cod_emp_fkey FOREIGN KEY (cod_emp)
        REFERENCES public.empresas (cod_emp) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID
);


CREATE TABLE public.aplicaciones_propuestas
(
    cedula_t dom_cedula NOT NULL,
    id_propuesta SERIAL NOT NULL,
    CONSTRAINT aplicaciones_propuestas_pkey PRIMARY KEY (cedula_t, id_propuesta),
    CONSTRAINT aplicaciones_propuestas_cedula_t_fkey FOREIGN KEY (cedula_t)
        REFERENCES public.tesistas (cedula_t) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT aplicaciones_propuestas_id_propuesta_fkey FOREIGN KEY (id_propuesta)
        REFERENCES public.propuestas (id_propuesta) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);