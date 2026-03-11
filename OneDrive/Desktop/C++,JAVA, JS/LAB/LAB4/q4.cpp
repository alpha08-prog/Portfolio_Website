#include <iostream>
using namespace std;

class Shape
{
public:
    double length;
    double breadth;

    void getdata(double a, double b)
    {
        length = a;
        breadth = b;
    }

    virtual void display_area() = 0;
};

class Triangle : public Shape
{
public:
    void display_area() override
    {
        double area = 0.5 * length * breadth;
        cout << "Area of the Triangle = " << area << endl;
    }
};

class Rectangle : public Shape
{
public:
    void display_area() override
    {
        double area = length * breadth;
        cout << "Area of the Rectangle = " << area << endl;
    }
};

int main()
{
    Triangle tri;
    tri.getdata(5.0, 4.0);
    tri.display_area();

    Rectangle rec;
    rec.getdata(5.0, 4.0);
    rec.display_area();

    return 0;
}
