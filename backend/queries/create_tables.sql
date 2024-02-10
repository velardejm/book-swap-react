CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE UsersInfo (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    condition VARCHAR(255) NOT NULL
);

CREATE TABLE OwnedBooks (
    user_id INT,
    book_id INT,
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (book_id) REFERENCES Books(id)
);

CREATE TABLE SwapRequests (
    id SERIAL PRIMARY KEY,
    requester_id INT,
    requestee_id INT,
    requested_book_id INT,
    offerred_book_id INT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
    FOREIGN KEY (requester_id) REFERENCES Users(id),
    FOREIGN KEY (requestee_id) REFERENCES Users(id),
    FOREIGN KEY (requested_book_id) REFERENCES Books(id),
    FOREIGN KEY (offerred_book_id) REFERENCES Books(id)
);



CREATE TABLE SwapRequests (
    id SERIAL PRIMARY KEY,
    requester_id INT,
    requestee_id INT,
    requested_book_id INT,
    offerred_book_id INT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
    FOREIGN KEY (requester_id) REFERENCES Users(id),
    FOREIGN KEY (requestee_id) REFERENCES Users(id),
    FOREIGN KEY (requested_book_id) REFERENCES Books(id),
    FOREIGN KEY (offerred_book_id) REFERENCES Books(id),
    CONSTRAINT unique_combination UNIQUE(requester_id, requested_book_id)
);




CREATE TABLE AcceptedSwaps (
    id SERIAL PRIMARY KEY,
    request_id INT,
    requester_confirmation BOOLEAN,
    requestee_confirmation BOOLEAN,
    FOREIGN KEY (request_id) REFERENCES SwapRequests(id)
);

CREATE TABLE RejectedSwaps (
    id SERIAL PRIMARY KEY,
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES SwapRequests(id)
);

CREATE TABLE CompletedSwaps (
    id SERIAL PRIMARY KEY,
    request_id INT,
    FOREIGN KEY (request_id) REFERENCES AcceptedSwaps(id)
);


