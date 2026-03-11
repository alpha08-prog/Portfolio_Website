
#include<bits/stdc++.h>
using namespace std;
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int uniq =0;
        if(nums.empty()){
            return 0;
        }
        for(int i=1; i<nums.size(); i++){
            if(nums[i]!=nums[uniq]){
            uniq++;
            nums[uniq] = nums[i];
        }
        
        }
        return uniq+1;
    }
};

int main(){
    vector<int> arr={1,22,3,4,4,2};
    
    sort(arr.begin(),arr.end());

    Solution s;
    int n = s.removeDuplicates(arr);
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    
    return 0;
}