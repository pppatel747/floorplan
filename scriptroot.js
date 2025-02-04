async function loadYAML() {
    try {
        let response = await fetch("graphics.yaml");
        let yamlText = await response.text();
        let data = jsyaml.load(yamlText);

        let svgContainer = document.getElementById("dynamic-svg");

        data.shapes.forEach(shape => {
            let newElement;
            if (shape.type === "circle") {
                newElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                newElement.setAttribute("cx", shape.cx);
                newElement.setAttribute("cy", shape.cy);
                newElement.setAttribute("r", shape.r);
            } else if (shape.type === "rect") {
                newElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                newElement.setAttribute("x", shape.x);
                newElement.setAttribute("y", shape.y);
                newElement.setAttribute("width", shape.width);
                newElement.setAttribute("height", shape.height);
            }

            newElement.setAttribute("stroke", shape.stroke);
            newElement.setAttribute("stroke-width", shape["stroke-width"]);
            newElement.setAttribute("fill", shape.fill);

            svgContainer.appendChild(newElement);
        });

    } catch (error) {
        console.error("Error loading YAML:", error);
    }
}
  
