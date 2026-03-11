#include<bits/stdc++.h>
using namespace std;

class Book{
    string title;
    string author;
    int pages;

    public:
    Book(){
        title="unknown";
        author="unknown";
        pages=0;
    }
    Book(string title,string author,int pages){
        this->author=author;
        this->pages=pages;
        this->title=title;
    }

     void displayBookInfo(){
        cout << "The details of the book are:" << endl;
        cout << "Title: " << title << endl;
        cout << "Author: " << author << endl;
        cout << "Pages: " << pages << endl;
    }

};

int main(){
    Book b1;

    b1.displayBookInfo();
    return 0;
}