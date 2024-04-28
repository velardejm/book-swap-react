ALTER TABLE IF EXISTS public.users
    ADD COLUMN email VARCHAR(255) UNIQUE;

UPDATE public.users
SET email = 'user1@email.com'
WHERE id = 1;

UPDATE public.users
SET email = 'user2@email.com'
WHERE id = 3;


ALTER TABLE public.users
ADD CONSTRAINT unique_email UNIQUE (email);
