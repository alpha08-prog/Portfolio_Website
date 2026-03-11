#include<iostream>
#include<stdlib.h>
#include<vector>
#include<map>
#include<set>
#include<stack>
#include<queue>
#include<unordered_map>
using namespace std;

int main(){
    int n;
    int arr[n];
    cout<<"Enter the number of elements "<<endl;
    cin>>n;
    int largest = 0;
    int smallest=10000;
    for(int i=0; i<n;i++){
        cin>>arr[i];
        if(arr[i]>largest){
            largest = arr[i];
        }
        if(arr[i]<smallest){
            smallest = arr[i];
        }
        
    }
    cout<<"Largest element of the array is "<<largest<<endl;
    cout<<"Smallest element of the array is "<<smallest<<endl;

    return 0;
}