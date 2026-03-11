#include<iostream>
#include<stdlib.h>
#include<vector>
#include<map>
#include<set>
#include<stack>
#include<queue>
#include<unordered_map>
using namespace std;

int sum(int n){
    int arr[n];
    int sum=0;
    for(int i=0; i<n;i++){
        cin>>arr[i];
        sum+=arr[i];
        
    }
    cout<<"The sum of given numbers are: "<<endl;
    return sum;
}

int product(int a){
    int array[a];
    int prod =1;
    for(int i=0; i<a;i++){
        cin>>array[i];
        prod*=array[i];
    }
    cout<<"The product of given numbers are: "<<endl;
    return prod;
}


int main(){
    int n;
    cout<<"Enter the number of elements "<<endl;
    cin>>n;
    cout<<sum(n)<<endl;
    cout<<product(n)<<endl;
    
    return 0;
}