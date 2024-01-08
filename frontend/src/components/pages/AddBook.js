export default function AddBook() {
    return (
        <div>

        </div>
    )
}
/*
TODO:
1. Add book form
2. Handle add book form
    1. PUT route in the backend
        1. Verify token
        2. Get the user from the token
        3. If all is ok, create a new book object
        4. Add the book to the user's book list
        5. Return the response with status
    2. If response is 200, reload the user dashboard to show the new book


Next TODO:
*Implement DELETE book in the dashboard which follows the same flow above
*Implement EDIT book details in the dashboard which follows the same flow above
    -Need to create an edit book details page.
*Update the swap book form
*Implement the book swap feature
*/