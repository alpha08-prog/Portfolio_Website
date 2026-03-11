#include <iostream>
#include <stdlib.h>
#include <vector>
#include <map>
#include <set>
#include <stack>
#include <queue>
#include <unordered_map>
using namespace std;

int factors(int num)
{
    for (int i = 1; i < num; i++)
    {
        if (num % i == 0)
        {
            cout<<i<<endl;
        }
    }
}

int main()
{
    int num;
    cin >> num;
    cout<<"Factors of "<<num<<" are :"<<endl;
     factors(num);
    
    return 0;
}