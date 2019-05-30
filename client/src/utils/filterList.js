// Search in list
export default function filterList(){
    // Declare variables
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('foodstuff-list-search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("foodstuff-list");
    if (ul) {
        li = ul.getElementsByTagName('li');
    }

    if (li) {
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("h2")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

}