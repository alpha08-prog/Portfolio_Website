#include<iostream>//reverse without recursion
#include<stdlib.h>
#include<vector>
#include<map>
#include<set>
#include<stack>
#include<queue>
#include<unordered_map>
using namespace std;

int main(){
    int num;
    cout<<"Enter the number to be reversed"<<endl;
    cin>>num;
    int rev = 0;
    while(num>0){
        rev = rev*10 + num%10;
        num = num/10;
    }
    cout<<"The reversed number is: "<<rev<<endl;
    return 0;
}