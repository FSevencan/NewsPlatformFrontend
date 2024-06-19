
import useTags from '@/hooks/tagHook/useTag';
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"
import Link from "next/link";


const Tags = () => {

    const { tags } = useTags();
    
    return (
        <div className="panel_inner mb-0">
        <div className="panel_header">
          <h4>
            <strong>ETİKETLER </strong>
          </h4>
        </div>
           <div className="panel_body">
               
                <div className="tags-inner d-flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Link key={tag.id} className="ui tag text-uppercase fw-semibold border"
                            href={`/tag/${formatSubCategoryForURL(tag.name)}`}>
                            {tag.name} 
                        </Link>

                    ))}
                </div>
               
        </div>
      </div>
    );
};

export default Tags;