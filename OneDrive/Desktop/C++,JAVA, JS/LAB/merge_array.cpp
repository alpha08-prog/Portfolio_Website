#include<iostream>
#include<stdlib.h>
#include<vector>
#include<map>
#include<set>
#include<stack>
#include<queue>
#include<unordered_map>
using namespace std;

int merge(int a[],int s1,int b[],int s2,int merged[]){
    int i=0,j=0,k=0;
    while(i<s1 && j<s2){
        if(a[i]<=b[j]){
            merged[k++] = a[i++];
        }else{
            merged[k++] = b[j++];
        }
    }

    while(i<s1){
        merged[k++]= a[i++];
    }
    while(j<s2){
        merged[k++]= b[j++];
    }

}

int main(){
    int array1[]= {1,2,3};
    int array2[]= {4,5,6};
    int s1 = 3,s2= 3;
    int merged[6];

    merge(array1,3,array2,3,merged);

    for(int i=0; i<6;i++){
        cout<<merged[i]<<endl;
    }

    
    
    return 0;
}