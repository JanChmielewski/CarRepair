--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Homebrew)
-- Dumped by pg_dump version 14.11 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_user; Type: TABLE; Schema: public; Owner: carrepair
--

CREATE TABLE public.app_user (
    id bigint NOT NULL,
    name character varying(255),
    password character varying(255),
    surname character varying(255),
    worker_code character varying(255),
    authority character varying(255)
);


ALTER TABLE public.app_user OWNER TO carrepair;

--
-- Name: app_user_id_seq; Type: SEQUENCE; Schema: public; Owner: carrepair
--

CREATE SEQUENCE public.app_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_user_id_seq OWNER TO carrepair;

--
-- Name: app_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carrepair
--

ALTER SEQUENCE public.app_user_id_seq OWNED BY public.app_user.id;


--
-- Name: app_user_seq; Type: SEQUENCE; Schema: public; Owner: carrepair
--

CREATE SEQUENCE public.app_user_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_user_seq OWNER TO carrepair;

--
-- Name: car; Type: TABLE; Schema: public; Owner: carrepair
--

CREATE TABLE public.car (
    id bigint NOT NULL,
    brand character varying(255),
    engine character varying(255),
    mileage character varying(255),
    model character varying(255),
    registration_number character varying(255),
    vin character varying(255),
    year_of_production integer,
    status character varying(255),
    client_id bigint,
    CONSTRAINT car_status_check CHECK (((status)::text = ANY ((ARRAY['IN_REPAIR'::character varying, 'READY_TO_PICK_UP'::character varying, 'REPAIRED'::character varying, 'WAITING_FOR_PAYMENT'::character varying, 'WAITING_FOR_REPAIR'::character varying, 'WAITING_FOR_PARTS'::character varying, 'WAITING_FOR_DIAGNOSIS'::character varying])::text[])))
);


ALTER TABLE public.car OWNER TO carrepair;

--
-- Name: car_id_seq; Type: SEQUENCE; Schema: public; Owner: carrepair
--

CREATE SEQUENCE public.car_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.car_id_seq OWNER TO carrepair;

--
-- Name: car_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carrepair
--

ALTER SEQUENCE public.car_id_seq OWNED BY public.car.id;


--
-- Name: car_seq; Type: SEQUENCE; Schema: public; Owner: carrepair
--

CREATE SEQUENCE public.car_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.car_seq OWNER TO carrepair;

--
-- Name: client; Type: TABLE; Schema: public; Owner: carrepair
--

CREATE TABLE public.client (
    id bigint NOT NULL,
    email character varying(255),
    name character varying(255),
    phone_number character varying(255),
    surname character varying(255),
    client_id bigint NOT NULL
);


ALTER TABLE public.client OWNER TO carrepair;

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: carrepair
--

CREATE SEQUENCE public.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_id_seq OWNER TO carrepair;

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carrepair
--

ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;


--
-- Name: client_seq; Type: SEQUENCE; Schema: public; Owner: carrepair
--

CREATE SEQUENCE public.client_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_seq OWNER TO carrepair;

--
-- Name: app_user id; Type: DEFAULT; Schema: public; Owner: carrepair
--

ALTER TABLE ONLY public.app_user ALTER COLUMN id SET DEFAULT nextval('public.app_user_id_seq'::regclass);


--
-- Name: car id; Type: DEFAULT; Schema: public; Owner: carrepair
--

ALTER TABLE ONLY public.car ALTER COLUMN id SET DEFAULT nextval('public.car_id_seq'::regclass);


--
-- Name: client id; Type: DEFAULT; Schema: public; Owner: carrepair
--

ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);


--
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: carrepair
--

COPY public.app_user (id, name, password, surname, worker_code, authority) FROM stdin;
17	John	$2a$10$DkkfjQ7PfIjiQaXEpU1Yle6jwbKJ.n4Vny1uvN0P4Cbau.Krmfuiq	Doe	161993	USER
18	John	$2a$10$BrH0IQaloqmGjqMtIXPyX.OjUQMyFO3eBAcB5Rx3lMX.FfFFeO.mm	Doe	109563	USER
19	John	$2a$10$eOVm5N6v1mwQacPtwWLaxO2X8KlHnodsJ1H66wnWAFMRVEDEozloa	Doe	839862	USER
20	John	$2a$10$DEIlqBpmUn.uA/aMo3JV3OywDCE3PrTDp9Pfm2CMAPi4nZ9R7XVKO	Doe	669587	USER
21	John	$2a$10$N8ON3RBl74l3OYcbUqbk.Oy0LbqrujfSe0kEoIu8fTOBXA6Cu46Ae	Doe	811850	USER
1	John	$2a$10$y3ZYCLQxIsLbKZJBMWMvD.pBRCt15NwIZ0TJxfSau8fhb/6S4B0kq	Doe	832265	USER
\.


--
-- Data for Name: car; Type: TABLE DATA; Schema: public; Owner: carrepair
--

COPY public.car (id, brand, engine, mileage, model, registration_number, vin, year_of_production, status, client_id) FROM stdin;
102	Honda	2.0L	80000	Civic	XYZ-789	2HGFG11816H300001	2015	WAITING_FOR_DIAGNOSIS	1
103	Toyota	1.8L	60000	Corolla	ABC-123	1HGCM82633A123456	2018	WAITING_FOR_DIAGNOSIS	1
502	Toyota	2.0L	12000	Corolla	ABC123	1HGCM82633A123456	2020	WAITING_FOR_DIAGNOSIS	2
\.


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: carrepair
--

COPY public.client (id, email, name, phone_number, surname, client_id) FROM stdin;
1	123456789	Jane	janeDoe@test.com	Doe	1
2	123456789	Jane	janeDoe@test.com	Doe	2
\.


--
-- Name: app_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carrepair
--

SELECT pg_catalog.setval('public.app_user_id_seq', 21, true);


--
-- Name: app_user_seq; Type: SEQUENCE SET; Schema: public; Owner: carrepair
--

SELECT pg_catalog.setval('public.app_user_seq', 1, true);


--
-- Name: car_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carrepair
--

SELECT pg_catalog.setval('public.car_id_seq', 1, false);


--
-- Name: car_seq; Type: SEQUENCE SET; Schema: public; Owner: carrepair
--

SELECT pg_catalog.setval('public.car_seq', 551, true);


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: carrepair
--

SELECT pg_catalog.setval('public.client_id_seq', 9, true);


--
-- Name: client_seq; Type: SEQUENCE SET; Schema: public; Owner: carrepair
--

SELECT pg_catalog.setval('public.client_seq', 301, true);


--
-- Name: app_user app_user_pkey; Type: CONSTRAINT; Schema: public; Owner: carrepair
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (id);


--
-- Name: car car_pkey; Type: CONSTRAINT; Schema: public; Owner: carrepair
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT car_pkey PRIMARY KEY (id);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: carrepair
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: car fkqudpn3oci54oqa8wgn4wdo7ab; Type: FK CONSTRAINT; Schema: public; Owner: carrepair
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT fkqudpn3oci54oqa8wgn4wdo7ab FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- PostgreSQL database dump complete
--

