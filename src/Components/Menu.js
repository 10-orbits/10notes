import Icons from "./Icons";
import MenuItem from "./MenuItem";


function Menu({createNewNote}){
    return(
    <div className="fixed-bottom p-2">
        <div className="container p-2 glass">
            <div className="row">
                <div className="col-4">
                <MenuItem icon={Icons().new} css="light" title="New" handleClick={createNewNote}/>
                <MenuItem icon={Icons().trash} css="danger" title="New"/>
                </div>
                <div className="col-4">
                
                </div>
                <div className="col-4">
                    
                </div>
            </div>
        </div>
    </div>
    )
}
export default Menu