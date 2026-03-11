#include <iostream>

int main() {
    int* ptr = nullptr;
    *ptr = 10;  

    std::cout << "Value: " << *ptr << std::endl;
    return 0;
}
