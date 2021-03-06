# A-Frame Trapezium Primitive
Provides a trapezium geometry primitive for A-Frame

![Trapezium Primitive](https://raw.githubusercontent.com/pookage/a-frame-trapezium-primitive/master/img/trapezium.gif)

## Properties

* **topWidth** : Width of top of trapezium *(defaults to 1)*
* **bottomWidth** : width of bottom of trapezium *(defaults to 2)*
* **height** : height of trapezium *(defaults to 1)*
* **flat** : renders the trapezium flat on the floor by default instead of upright *(defaults to false)*


## Usage

1. Reference `trapezium-primitive.js` in the `<head>` of your HTML document :

        <script src="js/trapezium-primitive.js"></script>

### Using the geometry primitive

2. Use `trapezium` as the value of your primitive in your geometry declaration :

        <a-entity 
            geometry="primitive: trapezium">
        </a-entity>

3. Add any additional properties as needed :

        <a-entity 
            geometry="primitive: trapezium; height: 2; topWidth: 7; bottomWidth: 4">
        </a-entity>    				

### Using the html primitive

2. Use the `<a-trapezium>` primitive :

        <a-trapezium>
        </a-trapezium>

3. Add any additional properties as needed :

        <a-trapezium
            height="2"
            topWidth="7"
            bottomWidth="4">
        </a-trapezium>
