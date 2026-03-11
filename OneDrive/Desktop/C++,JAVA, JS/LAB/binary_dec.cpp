#include<bits/stdc++.h>
using namespace std;

int binaryTodecimal(const string &binary){
    int decimal =0;
    int len = binary.length();
    for(int i=0; i<len; i++){
        if(binary[len-i-1]=='1'){
            decimal +=pow(2,i);
        }
    }
    return decimal;
}
int main(){
    string binary;
    cout<<"Enter a binary number"<<endl;
    cin>>binary;

    int decimal = binaryTodecimal(binary);
    cout<<"Decimal equivalent will be "<<decimal<<endl;
}