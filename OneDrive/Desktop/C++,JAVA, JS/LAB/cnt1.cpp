#include<iostream>
#include<stdlib.h>
#include<vector>
#include<map>
#include<set>
#include<stack>
#include<queue>
#include<unordered_map>
using namespace std;

int count(int n){
    int cnt=0;
    while(n!=0){
        int digit =n%10;
        if(digit==1){
            cnt++;
        }
        n/=10;
    }
    return cnt;
}

int main(){
    int n;
    cin>>n;
   int ones =  count(n);
   cout<<"Number of ones in the given number is "<<ones<<endl;
    return 0;
}