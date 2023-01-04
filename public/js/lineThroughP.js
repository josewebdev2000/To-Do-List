const tasks = Array.prototype.slice.call(document.querySelectorAll(".item.row"));

tasks.map(task => {
    const checker = task.querySelector("input[type='checkbox']");
    const ptask = task.querySelector("p");

    checker.addEventListener("click", () => {
        
        if (checker.checked)
        {
            ptask.style.textDecoration = 'line-through';
            ptask.style.textDecorationColor = '#A683E3';

        }
        else
        {
            ptask.style.textDecoration = 'none';
            
        }
    })
});

