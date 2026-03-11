#include<bits/stdc++.h>
using namespace std;

int main(){
    int a,n,r,sum=0;
    cout<<"Enter all the parameters to find sum of Gp(n,a,r): "<<endl;
    cin>>n>>a>>r;
    sum = a*(pow(r,n)-1)/(r-1);
    cout<<"Sum of the gp is "<<sum<<endl;
}