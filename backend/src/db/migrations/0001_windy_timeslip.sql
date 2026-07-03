CREATE TABLE "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"etiqueta" text NOT NULL,
	"calle" text NOT NULL,
	"colonia" text,
	"ciudad" text NOT NULL,
	"estado" text NOT NULL,
	"codigo_postal" text NOT NULL,
	"referencia" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;