# A-Frame-Trapezium-Primitive
Provides a primitive trapezium geometry for A-Frame

## Properties

* **topWidth** : Width of top of trapezium *(defaults to 1)*
* **bottoWidth** : width of bottom of trapezium *(defaults to 2)*
* **height** : height of trapezium *(defaults to 1)*


## Usage

1. Reference `trapezium-primitive.js` in the `<head>` of your HTML document :

    <script src="js/trapezium-primitive.js"></script>

2. Use `trapezium` as the value of your primitive in your geometry declaration :

        <a-entity 
            geometry="primitive: trapezium">
        </a-entity>

3. Add any additional properties as needed :

        <a-entity 
            geometry="primitive: trapezium; height: 2; topWidth: 7; bottomWidth: 4">
        </a-entity>    				
