#include<bits/stdc++.h>
using namespace std;

int swap(int x,int y){//without using temporary variable.
    x=x+y;
    y=x-y;
    x=x-y;

    cout<<"After swapping "<<"x = "<<x<<" "<<"y = "<<y<<endl;
}

int main(){
    int x= 20,y=80;
    swap(x,y);
    return 0;
}