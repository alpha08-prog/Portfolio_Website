#include<iostream>
#include<stdlib.h>
#include<vector>
#include<map>
#include<set>
#include<stack>
#include<queue>
#include<unordered_map>
using namespace std;

int prime(int num){
    for(int i=2; i<num/2; i++){
        if(num%i == 0){
            return false;
        }
    }
    return true;
    
}

int main(){
    int num;
    cout<<"Enter the number to be ckecked: "<<endl;
    cin>>num;
    if(prime(num)){
        cout<<num<<" is a prime number"<<endl;
    }
    else{
        cout<<num<<" is not a prime number"<<endl;
    }
    
    return 0;
}