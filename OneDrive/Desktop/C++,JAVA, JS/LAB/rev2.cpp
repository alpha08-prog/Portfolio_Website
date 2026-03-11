#include<iostream>
#include<stdlib.h>
#include<vector>
#include<map>
#include<set>
#include<stack>
#include<queue>
#include<unordered_map>
using namespace std;
int rev(int num,int reverse=0){
        if(num ==0){
            return reverse;
        }
        else{
            reverse = (reverse*10) + (num%10);
        
        return rev(num/10,reverse);
        }
    }
int main(){
    int num;
    cout<<"Enter the number"<<endl;
    cin>>num;
    int reversed_num = rev(num);
    cout<<reversed_num<<endl;
    return 0;
}