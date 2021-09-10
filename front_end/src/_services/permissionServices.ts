
export async function  getUserDepatment(){
    let User = JSON.parse(localStorage.getItem('user') || '{}');
   
    return User.department.title

}


export function getUserRoles(){
    let User = JSON.parse(localStorage.getItem('user') || '{}');

    return User.roles
}

function findCommonElements3(arr1:any, arr2:any) {
  return arr1.some((item: any )=> arr2.includes(item))
}

export const fetchPermission = () => async (permission: any): Promise<boolean> =>{
    // Simulate a delay from a request
  
    let permissions=false
  
    let department = getUserDepatment()
    let roles= getUserRoles()
    
    department.then(data=>{
        if(permission.department.includes(data)){
          permissions=true
        }
       if(findCommonElements3(permission.roles, roles))
        {
          permissions=true
        }
    })
    await new Promise(resolve => setTimeout(resolve, 100));
    return permissions
  }

