const pi = 3.141592653589793

function Point(x, y) {
	this.x = x
	this.y = y
}

Point.prototype.toString = function() {
	return `(${this.x}, ${this.y})`
}

function Shape() {

}

Shape.prototype.addToPlane = function(x,y) {
	this.position = new Point(x,y)
}

Shape.prototype.move = function(x,y) {
	this.position.x = x
	this.position.y = y
}

function Circle(radius) {
	this.radius = radius
}

Circle.prototype = Object.create(Shape.prototype)
Circle.prototype.constructor = Circle

Circle.prototype.diameter = function() {
	return 2 * this.radius
}

Circle.prototype.area = function() {
	return this.radius ** 2 * pi
}

Circle.prototype.circumference = function() {
	return 2 * this.radius * pi
}

function Side(length) {
	this.length = length
}

function Polygon(sides) {
	this.sides = sides.map((side) => side.length ? side : new Side(side)) 
	console.log(this.sides, typeof this.sides[0])
}

Polygon.prototype = Object.create(Shape.prototype)
Polygon.prototype.constructor = Polygon

Polygon.prototype.perimeter = function() {
	var measurement = 0
	this.sides.forEach( (side) => measurement += side.length )
	return measurement
}

Polygon.prototype.numberOfSides = function() {
	return this.sides.length
}

function Quadrilateral () {
	Polygon.call(this, Array.prototype.slice.call(arguments))
}

Quadrilateral.prototype = Object.create(Polygon.prototype)
Quadrilateral.prototype.constructor = Quadrilateral

function Triangle() {
	Polygon.call(this, Array.prototype.slice.call(arguments))
}

Triangle.prototype = Object.create(Polygon.prototype)
Triangle.prototype.constructor = Triangle

function Rectangle(width, height) {
	Quadrilateral.call(this, width, height, width, height)
	this.width = width
	this.height = height
}

Rectangle.prototype = Object.create(Quadrilateral.prototype)
Rectangle.prototype.constructor = Rectangle

Rectangle.prototype.area = function() {
	return this.width * this.height
}

function Square(length) {
	Rectangle.call(this, length, length)
	this.length = length
}

Square.prototype = Object.create(Rectangle.prototype)
Square.prototype.constructor = Square

Square.prototype.listProperties = function() {
	ownProps = []
	for (var prop in this) {	
		if (this.hasOwnProperty(prop)) {
			ownProps.push(prop)
		}
	}
	return ownProps.join(', ')
}
