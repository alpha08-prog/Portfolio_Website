#include <bits/stdc++.h>
using namespace std;

class Complex
{
    public:
    float real;
    float imag;


    Complex(float r = 0, float i = 0) : real(r), imag(i) {}

    Complex operator+(const Complex &obj)
    {
        Complex temp;
        temp.real = real + obj.real;
        temp.imag = imag + obj.imag;
        return temp;
    }
    void display()
    {
        cout << real << " + " << imag << "i" << endl;
    }
};

int main()
{
    Complex c1;
    Complex c2;
    cout<<"Enter the real and imag part of 1st complex number: "<<endl;
    cin>>c1.real>>c1.imag;

    cout<<"Enter the real and imag part of 2nd complex number: "<<endl;
    cin>>c2.real>>c2.imag;

    Complex c3 = c1 + c2;

    // Display the result
    cout << "The sum of the two complex numbers is: ";
    c3.display();


    return 0;
}