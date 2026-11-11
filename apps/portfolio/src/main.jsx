import React, {useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {createClient} from '@supabase/supabase-js';
import {PortfolioView,defaultContent,normalizeContent} from '@bong/shared';
import './site.css';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase=url&&key?createClient(url,key):null;
function App(){
 const [content,setContent]=useState(defaultContent);
 const [state,setState]=useState(supabase?'loading':'demo');
 useEffect(()=>{if(!supabase)return; let mounted=true;
  (async()=>{const {data:stateRow,error:stateError}=await supabase.from('site_state').select('published_version_id').eq('id',1).single();
   if(!mounted)return;
   if(stateError){setState('error');return;}
   if(!stateRow?.published_version_id){setState('unpublished');return;}
   const {data,error}=await supabase.from('site_versions').select('content').eq('id',stateRow.published_version_id).eq('status','published').single();
   if(!mounted)return;if(error){setState('error');return;}setContent(normalizeContent(data.content));setState('published');
  })();return()=>{mounted=false};
 },[]);
 useEffect(()=>{document.title=content.meta?.title||'The Bong Petuk';document.querySelector('meta[name="description"]')?.setAttribute('content',content.meta?.description||'Creator portfolio');},[content]);
 if(state==='loading') return <div className="site-status">Loading portfolio…</div>;
 if(state==='error') return <div className="site-status">The portfolio is temporarily unavailable. Please try again later.</div>;
 if(state==='unpublished') return <div className="site-status"><h1>The Bong Petuk</h1><p>The portfolio is being prepared. Please check back soon.</p></div>;
 return <><PortfolioView content={content}/>{state==='demo'&&<div className="site-demo">Preview content — connect Supabase and publish from your admin dashboard to make this live.</div>}</>;
}
createRoot(document.getElementById('root')).render(<App/>);
