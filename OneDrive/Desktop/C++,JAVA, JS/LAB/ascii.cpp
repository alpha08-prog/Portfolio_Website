#include <iostream>
#include <string>
using namespace std;

int main() {
    string input;
    cout << "Enter a string: ";
    getline(cin, input); 

    
    for (char ch : input) {
        cout << "Character: " << ch << " ASCII value: " << int(ch) << endl;
    }

    return 0;
}
