# 3637. Trionic Array I (easy level)
class Solution(object):
    def isTrionic(self, nums):
        """
        :type nums: List[int]
        :rtype: bool
        """

        is_trionic = False

        for i in range(1, len(nums)):
            if nums[i-1] == nums[i]:
                return False

        for i in range(1, len(nums)):
            if (nums[i-1] > nums[i]):
                break

            for j in range(i+1, len(nums)):
                if nums[j-1] < nums[j]:
                    break
                        
                for l in range(j+1, len(nums)):
                    if nums[l-1] < nums[l]:
                        is_trionic = True
                    else:
                        is_trionic = False
                        break
        return is_trionic
