### before

"/"
"/about"
"/articles/:id"
"/articles"
"/login"
"/getTxt"
"/getHtml"  
"/getImage"
"/\*"

### after

-   "/"
    -   "/"
    -   "/about"
    -   "/auth"
        -   "/login"
        -   "/logout"
    -   "/articles"
        -   "/"
        -   "/:id"
    -   "/file"
        -   "/getTxt"
        -   "/getHtml"
        -   "/getImage"
