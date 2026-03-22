CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"content" text,
	"excerpt" text,
	"image_url" text,
	"is_published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp,
	"category" text DEFAULT 'General' NOT NULL,
	"author" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_test_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"test_id" uuid NOT NULL,
	"score" integer,
	"total_correct" integer,
	"total_attempted" integer,
	"time_taken" integer,
	"completed_at" timestamp,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_tests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"duration" integer NOT NULL,
	"total_questions" integer NOT NULL,
	"difficulty" text DEFAULT 'Medium' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"scheduled_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "mock_tests_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "saved_exam_papers" (
	"user_id" uuid NOT NULL,
	"paper_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "saved_exam_papers_user_id_paper_id_pk" PRIMARY KEY("user_id","paper_id")
);
--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "current_affairs" ADD COLUMN "category" text DEFAULT 'General' NOT NULL;--> statement-breakpoint
ALTER TABLE "current_affairs" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "exam_papers" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "mock_test_attempts" ADD CONSTRAINT "mock_test_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_test_attempts" ADD CONSTRAINT "mock_test_attempts_test_id_mock_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."mock_tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_exam_papers" ADD CONSTRAINT "saved_exam_papers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_exam_papers" ADD CONSTRAINT "saved_exam_papers_paper_id_exam_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."exam_papers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_test_attempt" ON "mock_test_attempts" USING btree ("user_id","test_id");--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "current_affairs" ADD CONSTRAINT "current_affairs_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "exam_papers" ADD CONSTRAINT "exam_papers_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_slug_unique" UNIQUE("slug");