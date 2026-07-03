CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"nombre" text NOT NULL,
	"apellido" text NOT NULL,
	"telefono" text,
	"genero" text,
	"pais" text,
	"biografia" text,
	"acepta_terminos" boolean DEFAULT false NOT NULL,
	"recibir_newsletter" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
