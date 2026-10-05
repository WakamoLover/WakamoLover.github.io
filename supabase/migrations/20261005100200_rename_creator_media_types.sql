alter table public.cards
  drop constraint if exists cards_type_check;

update public.cards
set type = case type
  when 'IMAGE' then 'CREATOR'
  when 'VIDEO' then 'MEDIA'
  else type
end
where type in ('IMAGE', 'VIDEO');

alter table public.cards
  add constraint cards_type_check
  check (type in ('CREATOR', 'MEDIA', 'REF', 'GAME'));
