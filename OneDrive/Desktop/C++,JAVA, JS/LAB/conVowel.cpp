#include <iostream>
using namespace std;

bool isDigit(char ch) {
    return (ch >= '0' && ch <= '9');
}

bool isVowel(char ch) {
    
    if (ch >= 'A' && ch <= 'Z') {
        ch = ch + 32;
    }
    return (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u');
}

bool isChar(char ch) {
    return ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z'));
}

void check(char ch) {
    if (isDigit(ch)) {
        cout << ch << " is a digit." << endl;
    } 
    else if (isVowel(ch)) {
        cout << ch << " is a vowel." << endl;
    } 
    else if (isChar(ch)) {
        cout << ch << " is a consonant." << endl;
    } 
    else {
        cout << ch << " is neither a vowel, consonant, nor digit." << endl;
    }
}

int main() {
    char ch;
    cout << "Enter a character: ";
    cin >> ch;
    check(ch);

    return 0;
}
